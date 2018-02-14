#!/bin/bash

if [ ! -z "$(docker ps -q)" ]; then
  docker stop $(docker ps -q)
fi

if [ ! -z "$(docker ps -aq)" ]; then
  docker rm $(docker ps -aq)
fi

docker-compose -f ./docker-compose.yml pull 
docker-compose -f ./docker-compose.yml up -d