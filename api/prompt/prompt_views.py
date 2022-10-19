import os
from flask import Blueprint, jsonify, request

from api.security.auth0_service import requires_auth
from api.prompt.prompt_service import generate

from api.helpers import user

bp_name = "api-prompt"
bp_url_prefix = "/api/prompt"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("", methods=["POST", "OPTIONS"])
@requires_auth
def public():
    request_data = request.get_json()
    for value in ["prompt"]:
        if value not in request_data:
            return jsonify(error=f"Missing required request param: {value}"), 400
    prompt = request_data["prompt"]

    if "seed" in request_data:
        seed = request_data["seed"]
    else:
        seed = None

    user_id = user.get_user_id(user_info=user.get_user_info())
    saved_prompt = generate(prompt=prompt, user_id=user_id, seed=seed)
    prompt_response = jsonify(
        {
            "prompt": {
                "id": saved_prompt.id,
                "img_url": saved_prompt.img_url,
                "value": saved_prompt.value,
                "version": saved_prompt.version,
                "engine": saved_prompt.img_engine,
                "seed": saved_prompt.seed,
            }
        }
    )
    return (prompt_response, 201)


# http://localhost:5002/api/prompt/authtest
@bp.route("/authtest", methods=["POST", "GET"])
@requires_auth
def authtest():
    return jsonify(message="interesting")
