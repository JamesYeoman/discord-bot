#!/usr/bin/env bash

if asdf which node | grep 'unknown command' &>/dev/null; then
    echo "The repo's node version is not installed!"
    echo "Installing..."
    asdf install
fi

if ! asdf which yarn &> /dev/null; then
    echo "Yarn not installed! Installing Yarn!"
    npm install -g yarn
    asdf reshim

    echo "You should run `yarn install` now, before starting this script again!"
    exit 1
fi

if ! asdf which pm2 &> /dev/null; then
    echo "Installing PM2"
    npm install -g pm2
    asdf reshim
fi

echo "Registering PM2 services"

rm -rf dist
yarn run tsc

pm2 start
pm2 startup
