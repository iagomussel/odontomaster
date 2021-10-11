#!/usr/bin/env bash
pm2 serve --spa app/dist 8080
npm run pm2 --prefix api  #-- api
nginx -g "daemon off;"