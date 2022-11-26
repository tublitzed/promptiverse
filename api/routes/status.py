import logging

from flask import Blueprint

bp_name = "status"
bp_url_prefix = "/status"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/")
def public():
    print('testing print')
    logging.debug("debug log")
    logging.info("info log")
    logging.warning("warning log")
    logging.error("error log")
    logging.exception("exception log")
    return {"status": "ok"}
