# Content

- Project Name
- Descriptions
- Installing
- Set up enviroment
- Run the app
- Run unit test
- Technology used

## Project Name

Build a Storefront Backend

## Descriptions

build the backend of an online store by architecting the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

## Installing

run yarn to install dependencies

## set up enviroment variables

create `.env` with all the required enviroment variables.
NODE_ENV= dev
PORT=4000

#### set database connection info

#### .env

PORT=4000
NODE_ENV=dev

#### set database connection info

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=storefront_dev
DB_DATABASE_TEST=storefront_test
DB_USER=postgres
DB_PASSWORD=postgres

##### security

BCRYPT_PASSWORD=secret_password
SALT_ROUNDS=10
TOKEN_SECRET=private_token

### how to setup and connect to the database

- psql -U storefront postgres
- \c storefront_dev and \c storefront_test for testing

# create database

CREATE DABASE "database's name"

### run migration

db-migration up

### reset migration

db-migrate reset

## Run the app

yarn dev

## Run unit test

yarn test

## Technology used

- yarn
- TypeScript
- NodeJs
- Express
- db-migrate
- Jasmine
