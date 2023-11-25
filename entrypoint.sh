#!/bin/bash
WORKDIR=/app

cd $WORKDIR

# Install dependencies
yarn install --frozen-lockfile

if [ "$NODE_ENV" = "development" ];
then
  pm2-runtime start pm2.dev.config.js
else
  yarn workspaces run build
  pm2-runtime start pm2.config.js
fi