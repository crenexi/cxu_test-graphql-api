#!/bin/bash
set -e

colorRed=$'\e[1;31m'
colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorBlue=$'\e[1;34m'
colorMagenta=$'\e[1;35m'
colorCyan=$'\e[1;36m'
colorEnd=$'\e[0m'

function approveRelease {
  # Lint project
  gulp lint

  # Release confirmation
  printf "\n${colorGreen}READY TO RELEASE${colorEnd}\n"
  printf "\n${colorRed}/!\ YOU'RE ABOUT TO RELEASE${colorEnd}\n"
  read -p "Are you sure to proceed? " -n 1 -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]
  then
    printf "\n${colorYellow}Cancelled release${colorEnd}\n"
    exit 1
  fi
}

function recentVersion {
  currVer=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')

  printf "${colorMagenta}${currVer}${colorEnd}\n\n"
}

function finishRelease {
  # git flow release finish ${version}
	# git push origin --tags
  echo 'testing finish release...'
}

# Check for unstaged commits
if [ -d ".git" ]; then
	changes=$(git status --porcelain)

	if [ -z "${changes}" ]; then
    approveRelease
    finishRelease
	else
		echo "Please commit staged files prior to bumping"
	fi
fi
