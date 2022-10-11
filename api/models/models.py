import os, datetime
from peewee import *

DB_NAME = os.environ['DB_NAME']
DB_USER = os.environ['DB_USER']
DB_PASSWORD = os.environ['DB_PASSWORD']
DB_HOST = os.environ['DB_HOST']
DB_PORT = 5432

psql_db = PostgresqlDatabase(
    DB_NAME,
    host=DB_HOST,
    password=DB_PASSWORD,
    port=DB_PORT,
    user=DB_USER,
)

class BaseModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = psql_db

class User(BaseModel):
    db_table = 'User'
    id = UUIDField(unique=True, primary_key=True)
    username = CharField(unique=True, max_length=50)
    password = CharField(max_length=100)
    first_name = CharField(null=True, max_length=50)
    last_name = CharField(null=True, max_length=50)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)

def create_tables():
    with psql_db:
        psql_db.create_tables([User])
