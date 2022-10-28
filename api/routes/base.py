from flask import (
    Blueprint,
    render_template,
    make_response,
    jsonify,
)
import random, os
from api.services.auth0 import requires_auth
from api.helpers import app
from api.helpers.seeder import seed_tag_categories, seed_tags
from api.models.tag import get_by_ids
from api.services.prompt import generate, build
from peewee import *

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
    fake = "universe in a bottle, with fruit"
    # tag_ids = ['b961b282-b35d-4079-be4c-b68396fc8c62','514ad4a2-a8b4-4692-a5f7-30446ea66170','85a75724-0e0a-497d-93ca-2d26fa7b8850','b27152ee-1447-4b37-9dd4-edc565422629']
    # tags = get_by_ids(tag_ids=tag_ids)
    # built = build("cats", tags)
    return jsonify({"fake": fake})


@bp.route("/seed", methods=["GET"])
def seed():
    can_seed = os.environ.get("ENABLE_SEEDER", False)
    if can_seed is False:
        return make_response("error", 400)
    seed_tag_categories()
    seed_tags()
    return ("OK", 201)


@bp.route("/callback", methods=["GET", "POST"])
def callback():
    return render_static()
