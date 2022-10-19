import os
from peewee import Model
from playhouse.db_url import connect

psql_db = connect(os.environ.get("DATABASE_URL"))


class BaseModel(Model):
    class Meta:
        database = psql_db
        schema = "public"
