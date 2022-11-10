from flask import Flask
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect

import os
from api.routes import (
    prompt as prompt_routes,
    tag as tag_routes,
    status as status_routes,
    base as base_routes,
)

from api.helpers import app as app_helper

import sentry_sdk
sentry_sdk.init(
    dsn=os.environ.get('SENTRY_API_DSN', ''),

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
    environment=os.environ.get('FLASK_ENV', 'production')
)

csrf = CSRFProtect()
app = Flask(__name__)
csrf.init_app(app)

config_name = 'DevelopmentConfig' if app_helper.is_dev() else 'Config'
app.config.from_object(f'config.flask.config.{config_name}')

# Disable CORS for now
# CORS(app)

app.register_blueprint(base_routes.bp)
app.register_blueprint(prompt_routes.bp)
app.register_blueprint(tag_routes.bp)
app.register_blueprint(status_routes.bp)

if __name__ == '__app__':
    port = int(os.environ.get('PORT', 3001))
    debug = os.environ.get('DEBUG', False)
    app.run(port=port, debug=debug)
