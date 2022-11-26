import os
from api.models.prompt import Prompt
from api.models.tag import Tag, Tag_Category
from api.models.ip_event import IP_Event

from api.models.base import psql_db


def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
                Tag,
                Tag_Category,
                IP_Event,
            ]
        )


# Ok it's not a migration, but... :0
if os.environ.get("RUN_MIGRATIONS") == "true":
    create_tables()
