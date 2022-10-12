from tkinter import N
import requests, os
from api.security import auth0_service

AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")

# https://auth0.com/docs/api/authentication#get-user-info
def get_user_info():
    auth_token = auth0_service.get_token_auth_header()
    if auth_token is None:
      return {}

    url = f"https://{AUTH0_DOMAIN}/userinfo"
    headers={'Authorization': f"Bearer {auth_token}"}
    resp = requests.get(url,headers=headers)
    return resp.json()
