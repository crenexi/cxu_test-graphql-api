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

function approveBump {
  # Lint project
  gulp lint

  # No errors; proceed
  readVersion
  printf "\n${colorGreen}READY TO START RELEASE${colorEnd}\n"
  printf "Current Version: ${colorMagenta}${version}${colorEnd}\n\n"
}

function confirmVersion {
  while true; do
    printf "\nVersion '${colorBlue}${newVersion}${colorEnd}' will be created.\n"
    read -p "Proceed to create release? [Y/N] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* )
          printf "${colorYellow}Cancelled${colorEnd}\n\n"
          exit 1;;
        * ) echo "Please answer yes or no.";;
    esac
  done
}

function promptVersion {
  read -p "Enter new semantic version: " newVersion

  # Ensure something was entered
  if [ -z "$newVersion" ]; then
    printf "${colorRed}/!\ NO VERSION SUPPLIED. EXITING.${colorEnd}\n\n"
    exit 1
  fi

  confirmVersion
}

function bumpPackageJson {
	npm version $newVersion --no-git-tag-version
  git add .
  git commit -m "Bumped version to ${newVersion}"
  printf "${colorGreen}BUMPED VERSION TO ${newVersion}${colorEnd}\n\n"
}

function startRelease {
  git checkout develop
  git pull origin develop
  git push origin develop
  git flow release start $newVersion
}

# Check for unstaged commits
if [ -d ".git" ]; then
	changes=$(git status --porcelain)

	if [ -z "${changes}" ]; then
    approveBump
    promptVersion
    startRelease
  	bumpPackageJson
	else
		echo "Please commit staged files prior to bumping"
	fi
fi
