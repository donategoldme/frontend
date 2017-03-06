#!/usr/bin/env bash
docker rm dgm_front
docker build -t dgm_front .
docker run -it --name dgm_front -v static_core:/usr/src/app/static/dist \
-p 81:81 --env-file prod.env \
--link dgm_backend:backend \
-m 1500M --memory-swap -1 \
-v /home/firegm/frontend/react/donategoldme/src:/usr/src/app/src \
dgm_front npm run dev




