import datetime, uuid

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import (
    DateTimeField,
    CharField,
    ForeignKeyField,
    UUIDField,
    IntegrityError,
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


def get_by_ids(tag_ids):
    return Tag.select().where(Tag.id.in_(tag_ids))


def valid_tag_ids(tag_ids):
    return get_by_ids(tag_ids).count() == len(tag_ids)
