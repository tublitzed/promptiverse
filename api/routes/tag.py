import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth

from api.helpers import user
from api.models.tag import get_all

bp_name = "api-tag"
bp_url_prefix = "/api/tag"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["GET"])
@requires_auth
def all_tags():
    tags = get_all()
    return jsonify({"tags": list(tags.dicts())})
