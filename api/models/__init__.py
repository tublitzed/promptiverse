from api.models.prompt import (
    Prompt
)

from api.models.models import (
    psql_db
)

def create_tables():
    with psql_db:
        psql_db.create_tables(
            [
                Prompt,
            ]
        )
