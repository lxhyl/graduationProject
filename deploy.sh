#!/bin/bash

cd /actions/bs/graduationProject
git pull origin main

echo 'pull success'
# web
cp -r /actions/bs/graduationProject/web-app/dist/*  /usr/local/nginx/html/bsweb/
echo 'copy web code success'


# node
cp -r /actions/bs/graduationProject/backEnd/* /node/serve/bsapi/
echo 'copy node code success'


cd /node/serve/bsapi/
/node/node-v13.2.0/bin/pm2 delete ./index.js
/node/node-v13.2.0/bin/pm2 start ./index.js