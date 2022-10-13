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

ENGINE_STABLE_DIFFUSION = "STABLE_DIFFUSION" # 1
ENGINE_MIDJOURNEY = "MIDJOURNEY" # 2

def image_engine_value_to_int(value):
    if value == "STABLE_DIFFUSION":
        return 1
    elif value == "MIDJOURNEY":
        return 2
    else:
        raise "Unknown image engine"


class BaseModel(Model):
    class Meta:
        database = psql_db
        schema = 'public'

class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    # linked to Auth0
    user_id = CharField(max_length=255)
    id = CharField(unique=True, primary_key=True)
    img_url = CharField(max_length=255)
    img_engine = IntegerField(default=image_engine_value_to_int(ENGINE_STABLE_DIFFUSION))
    value = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    version = IntegerField(default=1)

def create_prompt(user_id, value, img_url):
    Prompt.create(
        user_id=user_id,
        id=uuid.uuid4(),
        value=value,
        img_url=img_url)

def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
            ]
        )
