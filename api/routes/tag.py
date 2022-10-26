import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth

from api.models.tag_category import get_all as get_all_tag_categories
from api.models.tag import get_all as get_all_tags

bp_name = "api-tag"
bp_url_prefix = "/api/tag"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["GET"])
@requires_auth
def all_tags():
    tag_categories = get_all_tag_categories()
    tags = get_all_tags()
    return jsonify(
        {
            "categories": list(tag_categories.dicts()),
            "tags": list(tags.dicts()),
        }
    )
