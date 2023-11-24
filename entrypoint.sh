#!/bin/bash

WORKDIR=/app

cd $WORKDIR


if [ "$NODE_ENV" = "development" ];
then
  pm2-runtime start pm2.dev.config.js
else
  pm2-runtime start pm2.config.js
fi