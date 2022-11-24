import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from api.helpers.app import is_dev


def send_slack_message(message):
    if is_dev():
        return
    token = os.environ.get("SLACK_BOT_OAUTH_TOKEN")
    channel = os.environ.get("SLACK_NOTIFY_CHANNEL")

    print(channel)
    client = WebClient(token=token)
    print(client)
    try:
        response = client.chat_postMessage(channel=channel, text=message)
        assert response["message"]["text"] == message
    except SlackApiError as e:
        # You will get a SlackApiError if "ok" is False
        assert e.response["ok"] is False
        assert e.response["error"]  # str like 'invalid_auth', 'channel_not_found'
        print(f"Got an error: {e.response['error']}")
