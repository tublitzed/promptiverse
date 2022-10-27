import datetime

from peewee import (
    DateTimeField,
    CharField,
)

from api.models.base import BaseModel


class Tag_Category(BaseModel):
    db_table = "Tag"
    label = CharField(max_length=255)
    value = CharField(max_length=255, unique=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)


def create(value: str, label: str):
    tag_category = Tag_Category.get_or_create(value=value, label=label)
    return tag_category


def get_all():
    return Tag_Category.select()
