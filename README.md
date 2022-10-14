# promptiverse

[![Node.js CI](https://github.com/tublitzed/promptiverse/actions/workflows/node-build.yml/badge.svg)](https://github.com/tublitzed/promptiverse/actions/workflows/node-build.yml)

## Local setup
1. cp .flaskenv.example .flaskenv << Replace secrets with real values.
1. python -m venv venv (if not done already)
1. DB:
  - `createdb promptiverse` - if already exists can also `dropdb promptiverse` first
1. make start_flask
1. make start_fe
1. Visit http://127.0.0.1:3000

## Deployments

1. Heroku, via UI for the limited time being

## Envs

* http://127.0.0.1:3000
* https://promptiverse.com

## Auth

* Via Auth0

