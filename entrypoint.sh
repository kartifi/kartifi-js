#!/bin/bash

source ~/.bashrc
printf 'Welcome:'
WORKDIR=/app

cd $WORKDIR
yarn install
cd $WORKDIR/packages/core/kartifi-plugin-stripe
tsc build
cd $WORKDIR/packages/core/kartifi-plugin-shippo
tsc build
pm2-runtime start pm2.config.js