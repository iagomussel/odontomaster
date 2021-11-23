#!/usr/bin/env bash
pm2 serve --spa app/dist 8080
pm2 start api/src/bin/www.js --watch --name api
nginx -g "daemon off;"