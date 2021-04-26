#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status

# Tag the commit as Travis can deploy the the library (.tar) into github releases
git config --local user.name "abolis-biotechnologies"
git config --local user.email "developers@abolis.fr"
TRAVIS_TAG=v$RELEASE_VERSION # RELEASE_VERSION is exported from travis_package_lib.sh
git tag $TRAVIS_TAG

export PACKAGE_TO_UPLOAD=$(cd dist && ls *.tar)
