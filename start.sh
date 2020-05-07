#!/bin/bash

colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorEnd=$'\e[0m'

function validateRedisActive {
  if [ "$(redis-cli ping)" != "PONG" ]; then
    gnome-terminal -e redis-server
    printf "${colorGreen}Started Redis in a new terminal${colorEnd}\n"
  else
    printf "${colorGreen}Redis is already active${colorEnd}\n"
  fi
}

function promptStartPostgres {
  while true; do
    read -p "Did you start the postgres service? [Y/N] " yn
    case $yn in
      [Yy]* ) break;;
      [Nn]* )
        printf "${colorYellow}Cancelled${colorEnd}\n\n"
        exit 1;;
      * ) echo "Please answer yes or no.";;
    esac
  done
}

function validatePostgresActive {
  while true; do
    out=$(systemctl is-active --quiet service postgresql && echo yes);

    if [ -z "${out}" ]; then
      printf "\n${colorYellow}Postgres is not running. Start it now.${colorEnd}\n"
      promptStartPostgres
    else
      printf "${colorGreen}Postgres is active${colorEnd}\n"
      break
    fi
  done
}

# Ensure Postgres and Redis servers are running
validateRedisActive
validatePostgresActive

# Start app
npm run start
