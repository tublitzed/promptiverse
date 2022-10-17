import datetime, json
from unicodedata import category

from flask import current_app

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import DateTimeField,CharField,ForeignKeyField

from api.models.models import (
    BaseModel,
)

class Tag_Category(BaseModel):
    db_table = "Tag"
    label = CharField(max_length=255)
    value = CharField(max_length=255)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)


class Tag(BaseModel):
    db_table = "Tag"
    label = CharField(max_length=255)
    value = CharField(max_length=255)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
    tag_category = ForeignKeyField(Tag_Category)

def seed_tag_categories():
    with open(f"{current_app.root_path}/api/helpers/tags/tag_categories.json") as seed_file:
      parsed_json = json.load(seed_file)
    categories = parsed_json["categories"]
    for item in categories:
      existing_item = Tag_Category.get(value=item["value"])
      if existing_item is None:
        Tag_Category.create(label=item["label"],value=item["value"])
