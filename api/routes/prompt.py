import os
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth
from api.services.prompt import generate, build
from api.models.tag import get_by_ids
from api.helpers import user

bp_name = "api-prompt"
bp_url_prefix = "/api/prompt"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)

@bp.route("", methods=["POST", "OPTIONS"])
@requires_auth
def public():
    request_data = request.get_json()
    for value in ["prompt", "prompt_raw", "tag_ids"]:
        if value not in request_data:
            return jsonify(error=f"Missing required request param: {value}"), 400
    tag_ids = request_data["tag_ids"]
    tags = get_by_ids(tag_ids)
    if len(tag_ids) != tags.count():
        return jsonify(error="Invalid tags"), 400

    prompt = request_data["prompt"]
    prompt_raw = request_data["prompt_raw"]

    if "seed" in request_data:
        seed = request_data["seed"]
    else:
        seed = None

    saved_prompt = generate(
        prompt=build(prompt_raw=prompt_raw, tags=tags),
        prompt_raw=prompt_raw,
        user_id=user.get_user_id(user_info=user.get_user_info()),
        seed=seed,
        tag_ids=tag_ids,
    )
    prompt_response = jsonify(
        {
            "prompt": {
                "engine": saved_prompt.img_engine,
                "id": saved_prompt.id,
                "imgUrl": saved_prompt.img_url,
                "promptRaw": saved_prompt.prompt_raw,
                "prompt": saved_prompt.prompt,
                "seed": saved_prompt.seed,
                "tagIds": saved_prompt.tag_ids,
            }
        }
    )
    return (prompt_response, 201)


# http://localhost:5002/api/prompt/authtest
@bp.route("/authtest", methods=["POST", "GET"])
@requires_auth
def authtest():
    return jsonify(message="interesting")
