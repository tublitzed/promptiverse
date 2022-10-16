import json
from flask import Flask, render_template, make_response, redirect, jsonify, request, got_request_exception
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
import logging
import random
import os
from api.prompt import prompt_views
from api.models import create_tables
from api.helpers import user
from api.security import auth0_service

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
app.register_blueprint(prompt_views.bp)

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

@app.route('/', defaults={'all_paths': ''})
@app.route('/<path:all_paths>')
def catch_all_route(all_paths):
    return render_static()

@app.route("/", methods=["GET", "POST"])
def index():
    return render_static()

@app.route("/sandbox", methods=["POST"])
def sandbox():
    if (is_dev() is False):
        return make_response('error', 400)
    user_info = user.get_user_info()
    user_id = user.get_user_id(user_info=user_info)
    return jsonify(user_info=user_info, user_id=user_id,)


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

create_tables()

if __name__ == '__app__':
    port = int(os.environ.get('PORT', 3001))
    debug = os.environ.get('DEBUG', False)
    app.run(port=port, debug=debug)
