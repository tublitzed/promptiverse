start_flask:
		@echo "starting flask..."
		source venv/bin/activate && pip install -r requirements.txt && flask run -p 3001

start_fe:
		@echo "starting npm..."
		npm i && npm run dev
