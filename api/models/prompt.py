import datetime, uuid

# https://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-types-table
from peewee import DateTimeField, CharField, IntegerField, UUIDField
from playhouse.postgres_ext import ArrayField
from api.models.base import BaseModel

from api.helpers.aws import (
    copy_to_s3,
)

# See https://platform.stability.ai/pricing
ENGINE_SD_1 = "stable-diffusion-v1-5"
ENGINE_SD_2 = "stable-diffusion-512-v2-1"
ENGINE_SDXL_09 = "stable-diffusion-xl-1024-v0-9"
DEFAULT_ENGINE = ENGINE_SDXL_09


class Prompt(BaseModel):
    db_table = "Prompt"
    created_at = DateTimeField(default=datetime.datetime.now)
    # linked to Auth0
    user_id = CharField(max_length=255)
    id = UUIDField(unique=True, primary_key=True)
    img_url = CharField(max_length=255)
    seed = IntegerField(null=True)
    img_engine = CharField(default=DEFAULT_ENGINE, max_length=100)
    # TODO: set this to hardcoded list, not any string.
    style_preset = CharField(null=True, max_length=100)
    prompt_raw = CharField(
        max_length=255
    )  # value submitted by the user which may not be the ultimate 'value' we submit
    prompt = CharField(
        max_length=255
    )  # 77 tokens is not characters -- TODO: is there a limit here?
    tag_ids = ArrayField(CharField, null=True)


def save(
    img_url=str,
    prompt_raw=str,
    prompt=str,
    seed=int,
    style_preset=str,
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
        style_preset=style_preset,
        tag_ids=tag_ids,
        user_id=user_id,
    )


def get_by_user(user_id):
    return (
        Prompt.select(
            Prompt.created_at,
            Prompt.id,
            Prompt.img_url,
            Prompt.prompt,
            Prompt.seed,
            Prompt.style_preset,
        )
        .where(Prompt.user_id == user_id)
        .order_by(Prompt.created_at.desc())
    )
