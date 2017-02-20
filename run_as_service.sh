#!/usr/bin/env bash
docker rm dgm_front
docker build -t dgm_front .
docker service create --name dgm_front -v static_core:/usr/src/app/static/dist \
-p 81:81 --env-file prod.env \
--network dgmnetwork \
dgm_front npm run dev




