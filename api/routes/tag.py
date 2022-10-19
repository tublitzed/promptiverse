import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth
from api.services.prompt import generate

from api.helpers import user

bp_name = "api-tag"
bp_url_prefix = "/api/tag"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["POST", "GET"])
@requires_auth
def poc():
    return ("TEST", 201)
