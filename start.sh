#!/bin/bash

colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorEnd=$'\e[0m'

function promptStartRedis {
  while true; do
    read -p "Did you start the Redis service? [Y/N] " yn
    case $yn in
      [Yy]* ) break;;
      [Nn]* )
        printf "${colorYellow}Cancelled${colorEnd}\n\n"
        exit 1;;
      * ) echo "Please answer yes or no.";;
    esac
  done
}

function validateRedisActive {
  while true; do
    out=$(systemctl is-active --quiet service redis && echo yes);

    if [ -z "${out}" ]; then
      printf "\n${colorYellow}Redis is not running. Start it now.${colorEnd}\n"
      promptStartPostgres
    else
      printf "${colorGreen}Redis is active${colorEnd}\n"
      break
    fi
  done
}

function promptStartPostgres {
  while true; do
    read -p "Did you start the Postgres service? [Y/N] " yn
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
