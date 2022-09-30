# http://127.0.0.1:8000/ is default port
# http://127.0.0.1:5003/ is new one:
start:
		@echo "starting django..."
		source venv/bin/activate && pip install -r requirements.txt && python manage.py runserver 5003

migrate:
	  source venv/bin/activate && python manage.py migrate

create_migration:
		python manage.py makemigrations promptiverse
