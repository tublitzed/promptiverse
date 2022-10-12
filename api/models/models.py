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
    """A base model that will use our Postgresql database"""

    class Meta:
        database = psql_db


class User(BaseModel):
    db_table = "User"
    created_at = DateTimeField(default=datetime.datetime.now)
    first_name = CharField(null=True, max_length=50)
    id = UUIDField(unique=True, primary_key=True)
    last_name = CharField(null=True, max_length=50)
    password = CharField(max_length=100)
    updated_at = DateTimeField(default=datetime.datetime.now)
    username = CharField(unique=True, max_length=50)


IMAGE_ENGINES = [
    (1, "STABLE_DIFFUSION"),
    (2, "MIDJOURNEY"),
]


class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    creator = ForeignKeyField(User, backref="prompts")
    id = UUIDField(unique=True, primary_key=True)
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
                User,
            ]
        )
