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
  currVer=$(cat package.json \
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
  printf "Current Version: ${colorMagenta}${currVer}${colorEnd}\n\n"
}

function promptVersion {
  read -p "Enter bump type or new semantic version: " input

  # Ensure something was entered
  if [ -z "$input" ]; then
    printf "\n${colorRed}/!\ NO VERSION SUPPLIED. EXITING.${colorEnd}\n"
    help
    exit
  fi
}

function bumpPackageJson {
	output=$(npm version ${input} --no-git-tag-version)
  echo output;
	newVersion=${output:1}
}

function startRelease {
  git flow release start $newVersion
}

function help {
	printf "\nWhen prompted for semver, must supply one of:\n - <New Version>\n - major\n - minor\n - patch\n - premajor\n - preminor\n - prepatch\n - prerelease\n\n"
}

# Help
if [ "$1" = "help" ]; then
  help
  exit
fi

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
