from array import array
import datetime, uuid

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import DateTimeField, CharField, IntegerField, UUIDField
from playhouse.postgres_ext import ArrayField
from api.models.base import BaseModel

from api.helpers.aws import (
    copy_to_s3,
)

ENGINE_SD_1 = "stable-diffusion-v1-5"  # 1


class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    # linked to Auth0
    user_id = CharField(max_length=255)
    id = UUIDField(unique=True, primary_key=True)
    img_url = CharField(max_length=255)
    seed = IntegerField(null=True)
    img_engine = CharField(default=ENGINE_SD_1, max_length=100)
    user_value = CharField(
        max_length=255
    )  # value submitted by the user which may not be the ultimate 'value' we submit
    value = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    version = IntegerField(default=1)
    tag_ids = ArrayField(UUIDField, null=True)


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


def save(
    img_url=str,
    seed=int,
    tag_ids=[],
    user_id=str,
    user_value="",
    value=str,
):
    version = create_prompt_version(value, user_id)
    prompt_id = uuid.uuid4()
    s3_img_url = copy_to_s3(
        user_id=user_id,
        src_filepath=img_url,
        filename=f"{prompt_id}/image.png",
    )
    return Prompt.create(
        id=prompt_id,
        img_url=s3_img_url,
        seed=seed,
        user_id=user_id,
        value=value,
        user_value=user_value,
        version=version,
        tag_ids=tag_ids,
    )
