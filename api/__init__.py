# from urllib.request import urlopen
# from functools import wraps

# from flask import Flask, request, jsonify
# from flask_cors import cross_origin, CORS

# from api.prompt import prompt_views
# from api.security.auth0_service import requires_auth, AuthError

# app = Flask(__name__, instance_relative_config=True, static_url_path='/static')

# CORS(
#     app,
#     resources={r"/api/*": {"origins": 'http://localhost:3001'}},
#     allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Origin"],
#     methods=["GET", "POST", "OPTIONS"],
#     max_age=86400
# )

# @app.errorhandler(AuthError)
# def handle_auth_error(ex):
#     response = jsonify(ex.error)
#     response.status_code = ex.status_code
#     return response

# # app.register_blueprint(messages_views.bp)
# # app.register_blueprint(status_views.bp)
# app.register_blueprint(prompt_views.bp)
# # app.register_blueprint(exception_views.bp)

# # This needs authentication
# @app.route("/api/prompt", methods=["POST"])
# @cross_origin(headers=["Content-Type", "Authorization"])
# @requires_auth
# def private():
#     resp = jsonify({"test": "foo"})
#     resp.headers.add('Access-Control-Allow-Origin', '*')
#     # response = "Hello from a private endpoint! You need to be authenticated to see this."
#     return (resp, 200)
# # ##########################################
# # # External Modules
# # ##########################################

# # import os

# # from flask import Flask
# # from flask_cors import CORS
# # from flask_talisman import Talisman

# # from api import exception_views
# # from api.messages import messages_views
# # from api.status import status_views
# # from api.prompt import prompt_views
# # from api.security.auth0_service import auth0_service

# # def create_app():

# #     ##########################################
# #     # Environment Variables
# #     ##########################################
# #     client_origin_url = os.environ.get("CLIENT_ORIGIN_URL")
# #     auth0_audience = os.environ.get("AUTH0_AUDIENCE")
# #     auth0_domain = os.environ.get("AUTH0_DOMAIN")

# #     if not (client_origin_url and auth0_audience and auth0_domain):
# #         raise NameError("The required environment variables are missing. Check .env file.")

# #     ##########################################
# #     # Flask App Instance
# #     ##########################################

# #     app = Flask(__name__, instance_relative_config=True, static_url_path='/static')

# #     ##########################################
# #     # HTTP Security Headers
# #     ##########################################

# #     csp = {
# #         'default-src': ['\'self\''],
# #         'frame-ancestors': ['\'none\'']
# #     }

# #     Talisman(app,
# #              frame_options='DENY',
# #              content_security_policy=csp,
# #              referrer_policy='no-referrer'
# #              )

# #     auth0_service.initialize(auth0_domain, auth0_audience)

# #     @app.after_request
# #     def add_headers(response):
# #         response.headers['X-XSS-Protection'] = '0'
# #         response.headers['Cache-Control'] = 'no-store, max-age=0'
# #         response.headers['Pragma'] = 'no-cache'
# #         response.headers['Expires'] = '0'
# #         response.headers['Content-Type'] = 'application/json; charset=utf-8'
# #         return response

# #     ##########################################
# #     # CORS
# #     ##########################################

# #     # TODO: need to re-enable this
# #     CORS(
# #         app
# #     )

# #     # CORS(
# #     #     app,
# #     #     resources={r"/api/*": {"origins": client_origin_url}},
# #     #     allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Origin"],
# #     #     methods=["GET", "POST", "OPTIONS"],
# #     #     max_age=86400
# #     # )

# #     ##########################################
# #     # Blueprint Registration
# #     ##########################################

# #     app.register_blueprint(messages_views.bp)
# #     app.register_blueprint(status_views.bp)
# #     app.register_blueprint(prompt_views.bp)
# #     app.register_blueprint(exception_views.bp)

# #     return app
