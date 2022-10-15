import logging
import boto3
import traceback
from botocore.client import Config
import os

# The default boto log level is set to DEBUG. Adjust here for all related utils:
BOTO_LOG_LEVEL = os.environ.get(
    "BOTO_LOG_LEVEL", logging.DEBUG
)  # DEBUG, ERROR, WARNING, INFO, CRITICAL
logging.getLogger("boto3").setLevel(BOTO_LOG_LEVEL)
logging.getLogger("botocore").setLevel(BOTO_LOG_LEVEL)
logging.getLogger("nose").setLevel(BOTO_LOG_LEVEL)
logging.getLogger("s3transfer").setLevel(BOTO_LOG_LEVEL)
logging.getLogger("urllib3").setLevel(BOTO_LOG_LEVEL)

# 86400 seconds = 24 hours
EXPIRES = 86400 * 7
BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
PRESIGNED_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID_PRESIGNED_URLS_ONLY")
PRESIGNED_SECRET_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY_PRESIGNED_URLS_ONLY")


def create_client():
    # https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html
    # https://botocore.amazonaws.com/v1/documentation/api/latest/reference/config.html
    # connect_timeout is seconds
    config = Config(connect_timeout=60 * 2, retries={"max_attempts": 10})
    client = boto3.client(
        "s3",
        config=config,
        aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"),
    )
    return client


def copy_to_s3_dir(user_id: str, src_filepath=str, filename=str):
    try:
        object_name = f"img/{user_id}/{filename}"
        s3_client = create_client()
        s3_client.upload_file(src_filepath, BUCKET_NAME, object_name)
    except Exception as e:
        logging.error(e)
        print(traceback.format_exc())
        return False

    return object_name


# Helpers to import a file to S3
def copy_to_s3(user_id: str, src_filepath: str, filename: str):
    try:
        object_name = copy_to_s3_dir(
            user_id=user_id, src_filepath=src_filepath, filename=filename
        )
    except:
        logging.error(
            f"Cannot copy_to_s3. user id: {user_id}, Filepath: {src_filepath}, Filename: {filename}."
        )
    img_path_in_s3 = f"https://{BUCKET_NAME}.s3.amazonaws.com/{object_name}"
    return img_path_in_s3
