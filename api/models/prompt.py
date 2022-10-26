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
    prompt_raw = CharField(
        max_length=255
    )  # value submitted by the user which may not be the ultimate 'value' we submit
    prompt = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    tag_ids = ArrayField(UUIDField, null=True)


def save(
    img_url=str,
    prompt_raw=str,
    prompt=str,
    seed=int,
    tag_ids=[],
    user_id=str,
):
    prompt_id = uuid.uuid4()
    s3_img_url = copy_to_s3(
        filename=f"{prompt_id}/image.png",
        src_filepath=img_url,
        user_id=user_id,
    )
    return Prompt.create(
        id=prompt_id,
        img_url=s3_img_url,
        prompt_raw=prompt_raw,
        prompt=prompt,
        seed=seed,
        tag_ids=tag_ids,
        user_id=user_id,
    )
