#!/usr/bin/env bash

npm run pm2 --prefix app  #-- app
npm run pm2 --prefix api  #-- api
nginx -g "daemon off;"