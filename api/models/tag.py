import datetime, uuid, logging

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import (
    DateTimeField,
    CharField,
    ForeignKeyField,
    UUIDField,
    IntegrityError,
    DatabaseError,
)

from api.models.base import BaseModel, psql_db
from api.models.tag_category import Tag_Category


class Tag(BaseModel):
    db_table = "Tag"
    id = UUIDField(unique=True, primary_key=True)
    label = CharField(max_length=255)
    value = CharField(max_length=255)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    tag_category = ForeignKeyField(Tag_Category)

    class Meta:
        indexes = (
            # create a unique index on value and tag_category cols
            (("value", "tag_category"), True),
        )


def get_or_create(value: str, label: str, category_id: int):
    try:
        with psql_db.atomic():
            new_tag_id = uuid.uuid4()
            return Tag.create(
                label=label, value=value, tag_category_id=category_id, id=new_tag_id
            )
    except IntegrityError:
        # `label` and `value` are indexed to be unique, so this Tag already exists,
        # making it safe to call .get().
        return Tag.get(value=value, tag_category_id=category_id)


def get_all():
    return Tag.select(
        Tag.tag_category,
        Tag.id,
        Tag.label,
    ).order_by(Tag.label.asc())


## This is a hack to force an update on all tags server side.
## We store the last updated timestamp in localStorage. If this
## is newer, we'll clear localStorage and fetch the latest list.
def get_latest_tag_updated():
    return Tag.select().order_by(Tag.updated_at.desc()).limit(1)


def get_public_tags():
    return Tag.select().join(Tag_Category).where(Tag_Category.is_public == True)


def get_by_ids(tag_ids, validate_count=False):
    """
    Get tags by their IDs with tag_category joined.
    Wraps the operation in a transaction to handle errors properly.
    Returns a list of Tag objects with tag_category preloaded.
    Raises DatabaseError if a database error occurs.
    
    Args:
        tag_ids: List of tag IDs to fetch
        validate_count: If True, raises ValueError if not all tags are found
    """
    try:
        with psql_db.atomic():
            # Load tags with tag_category joined to avoid lazy loading issues
            tags_query = Tag.select(Tag, Tag_Category).join(Tag_Category).where(Tag.id.in_(tag_ids))
            # Convert to list to ensure query executes within transaction
            tags = list(tags_query)
            
            # Validate that all requested tags were found
            if validate_count and len(tags) != len(tag_ids):
                raise ValueError(f"Expected {len(tag_ids)} tags but found {len(tags)}")
            
            return tags
    except DatabaseError as e:
        # Rollback is automatic with atomic(), but log the error
        logging.error(f"Database error in get_by_ids: {e}")
        raise


def valid_tag_ids(tag_ids):
    """
    Validate that all tag_ids exist in the database.
    Returns True if all tags exist, False otherwise.
    """
    try:
        with psql_db.atomic():
            count = Tag.select().where(Tag.id.in_(tag_ids)).count()
            return count == len(tag_ids)
    except DatabaseError as e:
        logging.error(f"Database error in valid_tag_ids: {e}")
        raise
