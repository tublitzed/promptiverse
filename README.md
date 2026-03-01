# promptiverse

Toy app exploring Stable Diffusion.

[![Builds](https://github.com/tublitzed/promptiverse/actions/workflows/build.yml/badge.svg)](https://github.com/tublitzed/promptiverse/actions/workflows/build.yml)

## Local setup
1. cp .flaskenv.example .flaskenv << Replace secrets with real values.
1. python -m venv venv (if not done already)
1. DB:
  - `createdb promptiverse` - if already exists can also `dropdb promptiverse` first. There's a hack to seed the DB: visit http://localhost:3001/seed.
1. make start_flask
1. make start_fe
1. Visit http://127.0.0.1:3000

## Deployments

1. Heroku, via UI
2. `heroku ps:exec bash -a promptiverse` run a bash shell in the main web dyno

## Envs

* http://127.0.0.1:3000
* https://promptiverse.3blitz.com (had the domain but let it expire in 2025, so moved the site)

## Auth

* Via Auth0. Try using localhost vs 127.0.0.1 if getting callback errors when logging in.

## Logs
* `heroku logs -a promptiverse --tail`

## Resources
* https://github.com/Stability-AI/stability-sdk
