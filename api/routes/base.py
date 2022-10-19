import json
from flask import (
    Flask,
    Blueprint,
    render_template,
    make_response,
    redirect,
    jsonify,
    request,
    got_request_exception,
)
import random
import os

from api.models import create_tables
from api.helpers import app

from api.models.tag import seed_tag_categories, seed_tags

bp_name = "base"
bp_url_prefix = "/"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


def render_static():
    cache_buster = random.randint(0, 1000000000)
    app_vars = {
        "API_SERVER_URL": os.environ.get("API_SERVER_URL"),
        "CLIENT_APP_AUTH0_DOMAIN": os.environ.get("CLIENT_APP_AUTH0_DOMAIN"),
        "CLIENT_APP_AUTH0_CLIENT_ID": os.environ.get("CLIENT_APP_AUTH0_CLIENT_ID"),
        "CLIENT_APP_AUTH0_AUDIENCE": os.environ.get("CLIENT_APP_AUTH0_AUDIENCE"),
        "CLIENT_APP_AUTH0_CALLBACK_URL": os.environ.get(
            "CLIENT_APP_AUTH0_CALLBACK_URL"
        ),
        "IS_DEV": app.is_dev(),
    }
    return render_template("index.html", app_vars=app_vars, cache_buster=cache_buster)


@bp.route("/", defaults={"all_paths": ""})
@bp.route("/<path:all_paths>")
def catch_all_route(all_paths):
    return render_static()


@bp.route("/", methods=["GET", "POST"])
def index():
    return render_static()


@bp.route("/sandbox", methods=["POST"])
def sandbox():
    if app.is_dev() is False:
        return make_response("error", 400)
    seed_tag_categories()
    seed_tags()
    return jsonify({"ta": "da"})


@bp.route("/callback", methods=["GET", "POST"])
def callback():
    return render_static()
