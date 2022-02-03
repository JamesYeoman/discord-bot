#!/usr/bin/env sh

if ! command -v pm2 &> /dev/null
then
    yarn global add pm2
fi

pm2 start

pm2 startup
