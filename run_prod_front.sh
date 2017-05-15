#!/usr/bin/env bash
docker rm dgm_front
docker build -t dgm_front .
docker run -it --name dgm_front -v static_core:/usr/src/app/static/dist/ \
--env-file prod.env \
--link dgm_backend:backend \
dgm_front npm run start-prod




