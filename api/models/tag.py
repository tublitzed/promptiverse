import datetime, json, uuid, logging
from unicodedata import category

from flask import current_app

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import (
    DateTimeField,
    CharField,
    ForeignKeyField,
    CompositeKey,
    UUIDField,
    IntegrityError,
    Database,
)

from api.models.models import BaseModel, psql_db


class Tag_Category(BaseModel):
    db_table = "Tag"
    label = CharField(max_length=255)
    value = CharField(max_length=255, unique=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)


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


def create_category(value: str, label: str):
    category = Tag_Category.get_or_create(value=value, label=label)
    return category


def create_tag(value: str, label: str, category_id: int):
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


def seed_tag_categories():
    with open(
        f"{current_app.root_path}/api/helpers/tags/tag_categories.json"
    ) as seed_file:
        parsed_json = json.load(seed_file)
    categories = parsed_json["categories"]
    for item in categories:
        create_category(value=item["value"], label=item["label"])


def seed_tags():
    with open(f"{current_app.root_path}/api/helpers/tags/tags.json") as tag_seeds:
        tag_json = json.load(tag_seeds)
    tags = tag_json["tags"]
    for category_collection in tags:
        category = Tag_Category.get(value=category_collection)
        for tag in tags[category_collection]:
            create_tag(
                value=tag["value"],
                label=tag["label"],
                category_id=category.id,
            )
