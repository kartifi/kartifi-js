#!/bin/bash

source ~/.bashrc
printf 'Welcome:'
WORKDIR=/app

cd $WORKDIR/packages/core/kartifi-plugin-stripe
npx tsc -b
cd $WORKDIR/packages/core/kartifi-plugin-shippo
npx tsc -b
cd $WORKDIR
yarn install

pm2-runtime start pm2.config.js