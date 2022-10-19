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
