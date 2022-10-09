class Config(object):
    DEBUG = False
    FLASK_APP = 'main.py'
    FLASK_ENV = 'production'
    RELEASE_TAG = 'N_DATE'  # use for prod cache busting as needed
    SECRET_KEY = 'apparently-yup-needed'
    PORT = 5002


class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_ENV = 'development'
    PORT = 5002
