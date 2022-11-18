import csv
from flask import current_app

from api.models.tag import get_or_create as create_tag
from api.models.tag_category import get_or_create as create_tag_category, Tag_Category


def seed_tag_categories():
    with open(
        f"{current_app.root_path}/api/helpers/tag_seeds/categories.csv", mode="r"
    ) as file:
        csv_file = csv.reader(file)
        row_count = 0
        for row in csv_file:
            if row_count != 0:  # skip header row
                print(row)
                create_tag_category(
                    value=row[1], label=row[0], is_public=row[2] == "True"
                )
            row_count = row_count + 1


def get_label(row):
    if row[0] is "":
        return row[1]
    return row[0]


def seed_by_category(category_value, category_file_name):
    category = Tag_Category.get(value=category_value)
    with open(
        f"{current_app.root_path}/api/helpers/tag_seeds/{category_file_name}", mode="r"
    ) as file:
        csv_file = csv.reader(file)
        row_count = 0
        for row in csv_file:
            if row_count != 0:  # skip header row
                create_tag(
                    value=row[1],
                    label=get_label(row),
                    category_id=category.id,
                )
            row_count = row_count + 1


def seed_tags():
    seed_by_category("ARTISTS", "artists.csv")
    seed_by_category("ADJECTIVES", "adjectives.csv")
