#!/bin/bash
set -e

colorRed=$'\e[1;31m'
colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorBlue=$'\e[1;34m'
colorMagenta=$'\e[1;35m'
colorCyan=$'\e[1;36m'
colorEnd=$'\e[0m'

function readVersion {
  version=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')
}

function confirmRelease {
  while true; do
    read -p "Are you sure to proceed? [Y/N] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* )
          printf "${colorYellow}Cancelled release${colorEnd}\n\n"
          exit 1;;
        * ) echo "Please answer yes or no.";;
    esac
  done
}

function approveRelease {
  # Lint project
  gulp lint

  # Release confirmation
  printf "\n${colorGreen}READY TO RELEASE${colorEnd}\n"
  printf "\n${colorYellow}/!\ YOU'RE ABOUT TO RELEASE VERSION ${version}${colorEnd}\n"
  confirmRelease
}

function finishRelease {
  # Finishes the release and tags
  git flow release finish ${version}
	git push origin --tags

  printf "\n${colorGreen}RELEASED ${version} AND PUSHED TAGS!${colorEnd}\n"
}

# Check for unstaged commits
if [ -d ".git" ]; then
	changes=$(git status --porcelain)

	if [ -z "${changes}" ]; then
    readVersion
    approveRelease
    finishRelease
	else
		echo "Please commit staged files prior to bumping"
	fi
fi
