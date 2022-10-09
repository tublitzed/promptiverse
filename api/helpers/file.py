from flask import current_app
import os, logging, traceback
from datetime import datetime

ROOT_STATIC_DIR = "static"
GENERATED_IMG_DIR = os.path.join(ROOT_STATIC_DIR, "img", "generated")

def create_img_dir():
    FULL_PATH = f"{current_app.root_path}/{GENERATED_IMG_DIR}"
    if not os.path.isdir(FULL_PATH):
      try:
        os.makedirs(FULL_PATH)
      except Exception as e:
          logging.error(e)
          print(traceback.format_exc())
          return False
    return FULL_PATH

def create_img_file():
    img_dir = create_img_dir()
    dt = datetime.now()
    ts = datetime.timestamp(dt)
    filename = f"img_{ts}.png"
    path = f"{img_dir}/{filename}"
    file = open(path, 'w+')
    file.close()
    return {
        "path": path,
        "public_path": f"{GENERATED_IMG_DIR}/{filename}",
    }
