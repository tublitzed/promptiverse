import os, datetime, uuid
from peewee import *
from playhouse.db_url import connect

from api.helpers.aws import (
    copy_to_s3,
)

psql_db = connect(os.environ.get("DATABASE_URL"))

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
    img_engine = CharField(default=ENGINE_SD_1, max_length=100)
    value = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    version = IntegerField(default=1)


def create_prompt_version(value, user_id):
    query = (
        Prompt.select()
        .where(Prompt.value == value, Prompt.user_id == user_id)
        .order_by(Prompt.version.desc())
        .first()
    )
    if query is None:
        return 1
    return query.version + 1


def save_prompt(user_id, value, img_url):
    version = create_prompt_version(value, user_id)
    prompt_id = uuid.uuid4()
    s3_img_url = copy_to_s3(
        user_id=user_id,
        src_filepath=img_url,
        filename=f"{prompt_id}/image.png",
    )
    return Prompt.create(
        user_id=user_id,
        id=prompt_id,
        value=value,
        img_url=s3_img_url,
        version=version,
    )


def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
            ]
        )
