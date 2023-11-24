#!/bin/bash
source ~/.bashrc
WORKDIR=/app

cd $WORKDIR
yarn install
if [ "$NODE_ENV" != "development" ];
then
  yarn workspaces run build
fi
# yarn install

if [ "$NODE_ENV" = "development" ];
then
  pm2-runtime start pm2.dev.config.js
else
  pm2-runtime start pm2.config.js
fi