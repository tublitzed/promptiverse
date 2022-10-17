import string, os, warnings, random
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from api.models import prompt as prompt_model
from api.models.prompt import ENGINE_SD_1

from api.helpers.file import (
    create_img_file,
)


# https://github.com/Stability-AI/stability-sdk
stability_api = client.StabilityInference(
    key=os.environ["STABILITY_KEY"],
    verbose=True,
    wait_for_ready=True,
    engine=ENGINE_SD_1,
)


def save(
        prompt_str: string,
        img_url: string,
        seed: int,
        user_id: string):
    return prompt_model.save(user_id=user_id, value=prompt_str, img_url=img_url, seed=seed)


def generate(prompt=string, user_id=string, seed=None):
    if seed is None:
        seed = random.randint(1, 10000)
    answers = stability_api.generate(
        prompt=prompt,
        seed=seed, # if provided, specifying a random seed makes results deterministic
        # steps=30, # defaults to 50 if not specified
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
                saved_prompt = save(
                    prompt_str=prompt,
                    img_url=file_meta["public_path"],
                    seed=seed,
                    user_id=user_id,
                )
    return saved_prompt
