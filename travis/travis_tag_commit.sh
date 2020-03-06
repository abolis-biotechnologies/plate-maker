#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

# Tag the commit as Travis can deploy the the library (.tar) into github releases
git config --local user.name "abolis-biotechnologies"
git config --local user.email "developers@abolis.fr"
TRAVIS_TAG=v$RELEASE_VERSION # RELEASE_VERSION is exported from travis_package_lib.sh
if git rev-parse "$TRAVIS_TAG" >/dev/null 2>&1; then
  echo -e "\e[31mTag ${TRAVIS_TAG} already exists on remote, aborting.\e[0m"
  exit 1
else
  git tag $TRAVIS_TAG
fi

export PACKAGE_TO_UPLOAD=$(cd dist && ls *.tar)
