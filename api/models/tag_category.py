import datetime

from peewee import (
    DateTimeField,
    CharField,
    BooleanField,
)

from api.models.base import BaseModel


class Tag_Category(BaseModel):
    db_table = "Tag"
    label = CharField(max_length=255)
    value = CharField(max_length=255, unique=True)
    is_public = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)


def get_or_create(value: str, label: str, is_public: bool):
    tag_category = Tag_Category.get_or_create(
        is_public=is_public,
        label=label,
        value=value,
    )
    return tag_category


def get_public_tag_categories():
    return Tag_Category.select().where(Tag_Category.is_public == True)


def get_all():
    return Tag_Category.select()
