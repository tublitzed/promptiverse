import datetime, uuid
from peewee import DateTimeField,CharField,IntegerField

from api.models.models import (
    BaseModel,
)

from api.helpers.aws import (
    copy_to_s3,
)

ENGINE_SD_1 = "stable-diffusion-v1-5"  # 1

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


def save(user_id, value, img_url):
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
