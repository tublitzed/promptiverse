import json
from flask import current_app

from api.models.tag import get_or_create as create_tag

from api.models.tag_category import get_or_create as create_tag_category, Tag_Category


def seed_tag_categories():
    with open(
        f"{current_app.root_path}/api/helpers/seeds/tag_categories.json"
    ) as seed_file:
        parsed_json = json.load(seed_file)
    categories = parsed_json["categories"]
    for item in categories:
        create_tag_category(value=item["value"], label=item["label"])


def seed_tags():
    with open(f"{current_app.root_path}/api/helpers/seeds/tags.json") as tag_seeds:
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
