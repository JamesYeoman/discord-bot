#!/usr/bin/env bash

if [[ ! -f "/usr/sbin/logrotate" ]]; then
    echo "Logrotate not found! Installing!"
    sudo apt-get install logrotate
fi

if [[ ! -f "/etc/logrotate.d/discordbot.conf" ]]; then
    echo "Logrotate config not installed! Installing!"
    sudo cp logrotate.conf /etc/logrotate.d/discordbot.conf
fi


if ! command -v volta &> /dev/null; then
    if [[ ! -d "${HOME}/.volta" ]]; then
        echo "Volta not installed! Installing volta!"
        curl https://get.volta.sh | bash
    fi

    if [[ "${VOLTA_HOME:-unset}" == "unset" ]]; then
        export VOLTA_HOME="${HOME}/.volta"
    fi

    export PATH="${VOLTA_HOME}/bin:$PATH"
fi

if [[ ! -f "${VOLTA_HOME}/bin/yarn" ]]; then
    echo "Yarn not installed! Installing Yarn!"

    if [[ ! -f "${VOLTA_HOME}/bin/node" ]]; then
        echo "Installing NodeJS"
        volta install node
    fi
fi

echo "Installing Yarn"
volta install yarn

if [[ ! -f "${VOLTA_HOME}/bin/pm2" ]]; then
    echo "Installing PM2"
    yarn global add pm2
fi

echo "Registering PM2 services"
pm2 start
pm2 startup
