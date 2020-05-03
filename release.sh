#!/bin/bash
set -e

colorRed=$'\e[1;31m'
colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorBlue=$'\e[1;34m'
colorMagenta=$'\e[1;35m'
colorCyan=$'\e[1;36m'
colorEnd=$'\e[0m'

function bump {
	output=$(npm version ${release} --no-git-tag-version)
	version=${output:1}
	search='("version":[[:space:]]*").+(")'
	replace="\1${version}\2"
}

function help {
	printf "\nWhen prompted for semver, must supply one of:\n - <newversion>\n - major\n - minor\n - patch\n - premajor\n - preminor\n - prepatch\n - prerelease\n\n"
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
    # Lint project
    gulp lint

    # If no errors, start the bump
    read -p "NEW SEMVER: " release

    # Ensure something was entered
    if [ -z "$release" ]; then
      printf "\n${colorRed}/!\ NO VERSION SUPPLIED. EXITING.${colorEnd}\n"
      help
      exit
    fi

    printf "hello\nworld\n"

		bump
		git add .
		git commit -m "Bump to ${version}"
		git tag -a "${output}" -m "${version}"
		git push origin --tags
	else
		echo "Please commit staged files prior to bumping"
	fi
fi
