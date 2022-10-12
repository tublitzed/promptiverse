import os, datetime
from peewee import *

DB_NAME = os.environ["DB_NAME"]
DB_USER = os.environ["DB_USER"]
DB_PASSWORD = os.environ["DB_PASSWORD"]
DB_HOST = os.environ["DB_HOST"]
DB_PORT = 5432

psql_db = PostgresqlDatabase(
    DB_NAME,
    host=DB_HOST,
    password=DB_PASSWORD,
    port=DB_PORT,
    user=DB_USER,
)


class BaseModel(Model):
    class Meta:
        database = psql_db

IMAGE_ENGINES = [
    (1, "STABLE_DIFFUSION"),
    (2, "MIDJOURNEY"),
]


class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    # linked to Auth0
    user_id = CharField(max_length=255)
    id = CharField(unique=True, primary_key=True)
    img_url = CharField(max_length=255)
    img_engine = IntegerField(default=1)
    value = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    version = IntegerField(default=1)


def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
            ]
        )
