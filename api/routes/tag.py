import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth

from api.models.tag_category import (
    get_all as get_all_tag_categories,
    get_public_tag_categories,
)
from api.models.tag import (
    get_all as get_all_tags,
    get_public_tags,
    get_latest_tag_updated,
)

bp_name = "api-tag"
bp_url_prefix = "/api/tag"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["GET"])
@requires_auth
def all_tags():
    tag_categories = get_all_tag_categories()
    tags = get_all_tags()
    latest_tag_updated_at = list(get_latest_tag_updated().dicts())[0]["updated_at"]
    return jsonify(
        {
            "categories": list(tag_categories.dicts()),
            "latest_tag_updated_at": latest_tag_updated_at,
            "tags": list(tags.dicts()),
        }
    )


@bp.route("cache-check", methods=["GET"])
@requires_auth
def cache_check():
    latest_tag_updated_at = list(get_latest_tag_updated().dicts())[0]["updated_at"]
    return jsonify(
        {
            "latest_tag_updated_at": latest_tag_updated_at,
        }
    )


@bp.route("/public", methods=["GET"])
def all_public_tags():
    # TODO: limit for non-auth
    tag_categories = get_public_tag_categories()
    tags = get_public_tags()
    latest_tag_updated_at = list(get_latest_tag_updated().dicts())[0]["updated_at"]
    return jsonify(
        {
            "categories": list(tag_categories.dicts()),
            "latest_tag_updated_at": latest_tag_updated_at,
            "tags": list(tags.dicts()),
        }
    )
