import logging
import time
from flask import Blueprint, jsonify
from peewee import DatabaseError
from api.models.base import psql_db

bp_name = "status"
bp_url_prefix = "/status"
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/")
def public():
    print("test print")
    logging.debug("debug log")
    logging.info("info log")
    logging.warning("warning log")
    logging.error("error log")
    logging.exception("exception log")
    return {"status": "ok"}


@bp.route("/db")
def db_health():
    """
    Simple database connection health check.
    Tests the connection by executing a simple query.
    Returns connection status, response time, and any errors.
    """
    start_time = time.time()
    try:
        # Execute a simple query to test the connection
        cursor = psql_db.execute_sql("SELECT 1")
        cursor.fetchone()
        response_time = round((time.time() - start_time) * 1000, 2)  # Convert to ms
        
        return jsonify({
            "status": "ok",
            "database": "connected",
            "response_time_ms": response_time
        }), 200
    except DatabaseError as e:
        response_time = round((time.time() - start_time) * 1000, 2)
        logging.error(f"Database health check failed: {e}")
        return jsonify({
            "status": "error",
            "database": "disconnected",
            "error": str(e),
            "response_time_ms": response_time
        }), 500
    except Exception as e:
        response_time = round((time.time() - start_time) * 1000, 2)
        logging.error(f"Unexpected error in database health check: {e}")
        return jsonify({
            "status": "error",
            "database": "unknown",
            "error": str(e),
            "response_time_ms": response_time
        }), 500
