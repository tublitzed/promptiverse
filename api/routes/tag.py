import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth

from api.helpers import user

bp_name = "api-tag"
bp_url_prefix = "/api/tag"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["GET"])
@requires_auth

# For now, just return all tags
def get():
    return ("TEST", 201)
