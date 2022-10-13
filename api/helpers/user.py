from tkinter import N
import requests, os
from api.security import auth0_service

AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")

# https://auth0.com/docs/api/authentication#get-user-info
# Returns JSON of the shape:
# {
#  "sub": "auth0|userid",
#  "nickname": "string",
#  "name": "emailIfNoneProvided",
#  "picture": "url",
#  "updated_at": "2022-10-12T02:09:52.231Z",
#  "email": "email@email.com",
#  "email_verified": "boolean"
# }
def get_user_info():
    auth_token = auth0_service.get_token_auth_header()
    if auth_token is None:
      return {}

    url = f"https://{AUTH0_DOMAIN}/userinfo"
    headers={'Authorization': f"Bearer {auth_token}"}
    resp = requests.get(url,headers=headers)
    return resp.json()

def get_user_id(user_info):
    if "sub" in user_info:
      sub = user_info["sub"]
      parts = sub.split("auth0|")
      if len(parts) < 2:
        return None
      return parts[1]
    else:
      return None
