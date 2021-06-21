#!/bin/bash
pm2 link $PM2_PUBLIC_KEY $PM2_SECRET_KEY
npm run pm2 --prefix app  #-- app
npm run pm2 --prefix api  #-- api
nginx -g "daemon off;"