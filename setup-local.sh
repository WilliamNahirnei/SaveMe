#!/usr/bin/env bash

echo "::::: SETUP STARTED :::::"

cp ./Backend/.env.example ./Backend/.env
# cp ./Frontend/.env.example ./Frontend/.env

docker-compose build --force-rm --no-cache

docker-compose up --force-recreate -d

docker exec -i saveme-db sh -c 'mysql -u root -proot' <<< "create database saveme;"

# docker exec -it saveme-frontend npm install

# docker exec -it saveme-frontend npm run build

docker exec -it saveme-backend npm install

docker exec -it saveme-backend npm install -g sequelize-cli

docker exec -it saveme-backend npx sequelize-cli db:migrate

docker-compose down

echo "::::: SETUP COMPLETED :::::"
