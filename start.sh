#!/bin/bash

pm2 link $PM2_PUBLIC_KEY $PM2_SECRET_KEY
npm run pm2 --prefix app          #-- app
npm run pm2 --prefix api  #-- api
cd api
sequelize-cli db:migrate
nginx -g "daemon off;"