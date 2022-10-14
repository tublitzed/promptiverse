import os, datetime, uuid
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

ENGINE_SD_1 = "stable-diffusion-v1-5"  # 1

class BaseModel(Model):
    class Meta:
        database = psql_db
        schema = "public"


class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    # linked to Auth0
    user_id = CharField(max_length=255)
    id = CharField(unique=True, primary_key=True)
    img_url = CharField(max_length=255)
    img_engine = CharField(default=ENGINE_SD_1,max_length=100)
    value = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    version = IntegerField(default=1)


def save_prompt(user_id, value, img_url):
    return Prompt.create(
        user_id=user_id,
        id=uuid.uuid4(),
        value=value,
        img_url=img_url,
    )


def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
            ]
        )
