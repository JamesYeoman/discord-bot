#!/usr/bin/env bash

if [[ ! -f "/usr/sbin/logrotate" ]]; then
    echo "Logrotate not found! Installing!"
    sudo apt-get install logrotate
fi

if [[ ! -f "/etc/logrotate.d/discordbot.conf" ]]; then
    echo "Logrotate config not installed! Installing!"
    sudo cp logrotate.conf /etc/logrotate.d/discordbot.conf
fi


if ! command -v nodenv &> /dev/null; then
    if [[ -d "${HOME}/.nodenv" ]]; then
        echo "Nodenv exists on system, but not setup in shell!"
        echo "Will do a temporary workaround, but it's recommended to properly"
        echo "setup nodenv!"
    else
        echo "Nodenv not installed! Installing Nodenv!"
        git clone https://github.com/nodenv/nodenv.git "${HOME}/.nodenv"
        pushd "${HOME}/.nodenv" && src/configure && make -C src
        popd
        echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bashrc
        mkdir -p "$(nodenv root)"/plugins
        git clone https://github.com/nodenv/node-build.git "$(nodenv root)"/plugins/node-build
    fi


    if [[ "${NODENV_HOME:-unset}" == "unset" ]]; then
        export NODENV_HOME="${HOME}/.nodenv"
    fi

    export PATH="${NODENV_HOME}/bin:$PATH"

    eval "$(nodenv init -)"
fi

if nodenv which node | grep 'is not installed' &>/dev/null; then
    echo "The repo's node version is not installed!"
    echo "Installing..."
    nodenv install
fi

if ! nodenv which yarn &> /dev/null; then
    echo "Yarn not installed! Installing Yarn!"
    npm install -g yarn
    nodenv rehash

    echo "You should run `yarn install` now, before starting this script again!"
    exit 1
fi

if ! nodenv which pm2 &> /dev/null; then
    echo "Installing PM2"
    npm install -g pm2
    nodenv rehash
fi

echo "Registering PM2 services"

rm -rf dist
yarn run tsc

pm2 start
pm2 startup
