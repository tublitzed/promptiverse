from api.models.prompt import Prompt

from api.models.tag import Tag, Tag_Category

from api.models.base import psql_db


def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
                Tag,
                Tag_Category,
            ]
        )


# create_tables()
