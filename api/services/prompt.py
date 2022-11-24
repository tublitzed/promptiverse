import string, os, warnings, random, uuid
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from api.models import prompt as prompt_model
from api.models.prompt import ENGINE_SD_1

from api.helpers.file import (
    create_img_file,
)
from api.helpers.aws import (
    copy_to_s3_public,
)

# https://github.com/Stability-AI/stability-sdk
stability_api = client.StabilityInference(
    key=os.environ["STABILITY_KEY"],
    verbose=True,
    wait_for_ready=True,
    engine=ENGINE_SD_1,
)


def add_to_suffix(tag_suffix=str, prepend=str, items=[], has_started_tag_list=bool):

    if len(items) > 0:
        # prefix with comma if first item to separate from raw value:
        if has_started_tag_list is False:
            tag_suffix = ", "
            has_started_tag_list = True

        # Add the items:
        tag_suffix = f"{tag_suffix}{prepend}{', '.join(items)}"

    return {
        "tag_suffix": tag_suffix,
        "has_started_tag_list": has_started_tag_list,
    }


def build(prompt_raw, tags):

    tag_suffix = ""
    has_started_tag_list = False
    artists = []
    descriptive_words = []

    for tag in tags:
        if tag.tag_category.value == "ARTISTS":
            artists.append(tag.value)
        if tag.tag_category.value == "DESCRIPTIVE":
            descriptive_words.append(tag.value)

    # TODO: just loop through categories
    metadata = add_to_suffix(
        tag_suffix=tag_suffix,
        prepend="by ",
        items=artists,
        has_started_tag_list=has_started_tag_list,
    )

    tag_suffix = metadata["tag_suffix"]
    has_started_tag_list = metadata["has_started_tag_list"]

    metadata = add_to_suffix(
        tag_suffix=tag_suffix,
        prepend=", ",
        items=descriptive_words,
        has_started_tag_list=has_started_tag_list,
    )

    tag_suffix = metadata["tag_suffix"]

    return f"{prompt_raw}{tag_suffix}"


def generate_for_user(
    user_id=string, prompt=string, prompt_raw=string, seed=None, tag_ids=[]
):
    img_url = generate(prompt=prompt, prompt_raw=prompt_raw, seed=seed, tag_ids=tag_ids)
    print(img_url)
    print("img_url^")
    saved_prompt = prompt_model.save(
        img_url=img_url,
        prompt_raw=prompt_raw,
        prompt=prompt,
        seed=seed,
        tag_ids=tag_ids,
        user_id=user_id,
    )
    return saved_prompt


def generate_public(
    ip_address=string, prompt=string, prompt_raw=string, seed=None, tag_ids=[]
):
    img_url = generate(prompt=prompt, prompt_raw=prompt_raw, seed=seed, tag_ids=tag_ids)
    prompt_id = uuid.uuid4()
    s3_img_url = copy_to_s3_public(
        filename=f"{prompt_id}/image.png",
        src_filepath=img_url,
        ip_address=ip_address,
    )
    return {
        "engine": ENGINE_SD_1,
        "id": prompt_id,
        "imgUrl": s3_img_url,
        "promptRaw": prompt_raw,
        "prompt": prompt,
        "seed": seed,
        "tagIds": tag_ids,
    }


def generate(prompt=string, prompt_raw=string, seed=None, tag_ids=[]):
    if seed is None:
        seed = random.randint(1, 10000)

    answers = stability_api.generate(
        prompt=prompt,
        seed=seed,  # if provided, specifying a random seed makes results deterministic
        # steps=30, # defaults to 50 if not specified
        # height and width must be in multiples of 64
        # height=512,
        # width=1600
    )
    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.finish_reason == generation.FILTER:
                warnings.warn(
                    "Your request activated the API's safety filters and could not be processed."
                    "Please modify the prompt and try again."
                )
            if artifact.type == generation.ARTIFACT_IMAGE:
                # First, make sure we have a file to work with
                file_meta = create_img_file()

                # Now, write the generated binary to the file
                outfile = open(file_meta["path"], "wb")  # Open a file for binary write
                outfile.write(artifact.binary)
                outfile.flush()  # Optional but a good idea
                outfile.close()
    return file_meta["public_path"]
