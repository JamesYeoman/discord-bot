#!/usr/bin/env bash

pm2 delete all
yarn tsc
pm2 start
