import os, logging
from flask import Blueprint, jsonify, request

from api.services.auth0 import requires_auth
from api.services.prompt import generate_for_user, generate_public, build
from api.models.tag import get_by_ids
from api.models.prompt import get_by_user
from api.models.ip_event import create, get_count_by_ip, update_generation_count
from api.helpers import user
from api.services.slack import send_slack_message

bp_name = "api-prompt"
bp_url_prefix = "/api/prompt"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


## Public builder will allow a limited number of generations per IP.
## Will save images in S3 for awhile, although should start a cleaning job if needed
## Will not save public records in DB to err on safe side
@bp.route("/public", methods=["POST", "OPTIONS"])
def public():
    ip_address = request.remote_addr

    logging.info(f"Attempting to generate for IP: {ip_address}")

    request_data = request.get_json()
    for value in ["prompt_raw", "tag_ids"]:
        if value not in request_data:
            return jsonify(error=f"Missing required request param: {value}"), 400
    tag_ids = request_data["tag_ids"]
    tags = get_by_ids(tag_ids)
    if len(tag_ids) != tags.count():
        return jsonify(error="Invalid tags"), 400

    if "seed" in request_data:
        seed = request_data["seed"]
    else:
        seed = None

    prompt_raw = request_data["prompt_raw"]

    # Before we allow generation, record ip and limit.
    # Not foolproof but can but limit to 0 quickly here to stop generations if needed.
    count_or_none = get_count_by_ip(ip_address)
    if count_or_none is None:
        create(ip_address)
    elif count_or_none > int(os.environ.get("PUBLIC_GENERATION_LIMIT_BY_IP", 10)):
        logging.info(f"Hit IP limit: {ip_address}")
        return jsonify({
                "error": "You have exceeded the number of images you can create without an account.",
                }), 403
    else:
        update_generation_count(ip_address, count_or_none + 1)

    logging.info(
        f"Generating for IP: {ip_address} using prompt: {prompt_raw} and tags: {tag_ids}"
    )
    send_slack_message(
        f"Generating for IP: {ip_address} using prompt: {prompt_raw} and tags: {tag_ids}"
    )

    generation_resp = generate_public(
        prompt=build(prompt_raw=prompt_raw, tags=tags),
        prompt_raw=prompt_raw,
        ip_address=ip_address,
        seed=seed,
        tag_ids=tag_ids,
    )
    return (jsonify({"prompt": generation_resp}), 200)


@bp.route("", methods=["POST", "OPTIONS"])
@requires_auth
def post():
    request_data = request.get_json()
    for value in ["prompt_raw", "tag_ids"]:
        if value not in request_data:
            return jsonify(error=f"Missing required request param: {value}"), 400
    tag_ids = request_data["tag_ids"]
    tags = get_by_ids(tag_ids)
    if len(tag_ids) != tags.count():
        return jsonify(error="Invalid tags"), 400

    if "seed" in request_data:
        seed = request_data["seed"]
    else:
        seed = None

    prompt_raw = request_data["prompt_raw"]
    saved_prompt = generate_for_user(
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


@bp.route("", methods=["GET"])
@requires_auth
def get():
    user_id = user.get_user_id(user_info=user.get_user_info())
    prompts = list(get_by_user(user_id).dicts())
    return (jsonify({"prompts": prompts}), 200)


# http://localhost:5002/api/prompt/authtest
@bp.route("/authtest", methods=["POST", "GET"])
@requires_auth
def authtest():
    return jsonify(message="interesting")
