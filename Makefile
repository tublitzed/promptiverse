start_flask:
		@echo "starting flask..."
		source venv/bin/activate && pip install -r requirements.txt && flask run -p 3001

start_fe:
		@echo "starting npm..."
		npm i && npm run dev

docker_build:
	docker-compose up -d --build

docker_run:
	docker-compose up -d

# https://dashboard.heroku.com/apps/tds-neverland-api/deploy/heroku-container
deploy:
	docker buildx build --platform linux/amd64 -t promptiverse . && docker tag promptiverse registry.heroku.com/promptiverse/web && docker push registry.heroku.com/promptiverse/web && heroku container:release web -a promptiverse
