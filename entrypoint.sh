#!/bin/bash

source ~/.bashrc
printf 'Welcome:'
WORKDIR=/app

cd $WORKDIR
yarn install
pm2-runtime start pm2.config.js