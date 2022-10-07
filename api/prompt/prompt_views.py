import os
from flask import (
    Blueprint,
    jsonify,
    request
)

from api.prompt.prompt import Prompt

from api.security.auth0_service import requires_auth, AuthError

from api.prompt.prompt_service import (
  generate
)

bp_name = 'api-prompt'
bp_url_prefix = '/api/prompt'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)

@bp.route("", methods=["POST"])
def public():
    request_data = request.get_json()
    required = ["prompt"]
    for value in required:
        if value not in request_data:
            return jsonify(error=f"Missing required request param: {value}"), 400
    prompt = request_data["prompt"]

    path = generate(prompt)
    prompt_response = jsonify({"file": path})
    # Example of allow listing everything:
    prompt_response.headers.add('Access-Control-Allow-Origin', '*')

    # Only allow client app to access this endpoint
    # prompt_response.headers.add('Access-Control-Allow-Origin', os.environ['CLIENT_ORIGIN_URL'])
    return (prompt_response, 201)

# http://localhost:5002/api/prompt/authtest
@bp.route("/authtest", methods=["POST", "GET"])
@requires_auth
def authtest():
    return jsonify(message="interesting")
