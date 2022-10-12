import string, os, warnings
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation

from api.helpers.file import (
    create_img_file,
)

stability_api = client.StabilityInference(
    key=os.environ["STABILITY_KEY"],
    verbose=True,
)


def generate(prompt: string):
    answers = stability_api.generate(
        prompt=prompt,
        # seed=34567, # if provided, specifying a random seed makes results deterministic
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
    return file_meta["public_path"]
