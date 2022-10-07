from flask import Flask, render_template, make_response, redirect
from waitress import serve
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
import logging
import random
import os
import pdb

def is_dev():
    return True if os.getenv("FLASK_ENV") == "development" else False


csrf = CSRFProtect()
app = Flask(__name__)
csrf.init_app(app)

# Talisman(
#     app,
#     # setting CSP at all is causing trouble with SSL redirects in prod. Disabling.
#     content_security_policy=None,
# )

config_name = 'DevelopmentConfig' if is_dev() else 'Config'
app.config.from_object(f'config.flask.config.{config_name}')

# CORS(app)

def render_static():
    cache_buster = random.randint(0, 1000000000)
    app_vars = {
        'API_SERVER_URL': os.environ.get('API_SERVER_URL'),
        'CLIENT_APP_AUTH0_DOMAIN': os.environ.get('CLIENT_APP_AUTH0_DOMAIN'),
        'CLIENT_APP_AUTH0_CLIENT_ID': os.environ.get('CLIENT_APP_AUTH0_CLIENT_ID'),
        'CLIENT_APP_AUTH0_AUDIENCE': os.environ.get('CLIENT_APP_AUTH0_AUDIENCE'),
        'CLIENT_APP_AUTH0_CALLBACK_URL': os.environ.get('CLIENT_APP_AUTH0_CALLBACK_URL'),
        'IS_DEV': is_dev()
    }
    return render_template('index.html',
                           app_vars=app_vars, cache_buster=cache_buster)

@app.route('/')
def index():
    return render_static()

@app.route("/callback", methods=["GET", "POST"])
def callback():
    return render_static()

@app.route("/status", methods=["GET"])
def health_check():
    logging.debug("debug log")
    logging.info("info log")
    logging.warning("warning log")
    logging.error("error log")
    logging.exception("exception log")

    return make_response("OK", 200)

if __name__ == '__app__':
    port = int(os.environ.get('PORT', 3001))
    serve(app, host='0.0.0.0', port=port)
