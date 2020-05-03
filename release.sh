#!/bin/bash
set -e

function bump {
	output=$(npm version ${release} --no-git-tag-version)
	version=${output:1}
	search='("version":[[:space:]]*").+(")'
	replace="\1${version}\2"
}

function help {
	echo "Usage: $(basename $0) [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]"
}

# Help
if [ "$release" = "help" ]; then
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
      help
      exit
    fi

		bump
		git add .
		git commit -m "Bump to ${version}"
		git tag -a "${output}" -m "${version}"
		git push origin --tags
	else
		echo "Please commit staged files prior to bumping"
	fi
fi
