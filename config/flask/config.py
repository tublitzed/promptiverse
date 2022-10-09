class Config(object):
    DEBUG = False
    DEFAULT_HIGH_THRESHOLD = 100
    DEFAULT_LOW_THRESHOLD = 30
    ENABLE_UPLOAD_LIMIT = True
    FLASK_APP = 'main.py'
    FLASK_ENV = 'production'
    PREVIEW_BYTE_THRESHOLD = 250000  # 250KB
    RELEASE_TAG = 'WM_041122_02'  # use for prod cache busting as needed
    SECRET_KEY = 'apparently-yup-needed'


class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_ENV = 'development'
    ENABLE_UPLOAD_LIMIT = False
