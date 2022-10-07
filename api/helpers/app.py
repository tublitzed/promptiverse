import os

def is_dev():
    return True if os.getenv("FLASK_ENV") == "development" else False
