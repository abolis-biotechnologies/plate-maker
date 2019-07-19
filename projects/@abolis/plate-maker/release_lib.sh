#!/bin/bash

# This script can be used to release new version of the library in order to use it in others projects/libraries
# It zip (.tar) the directory of the built library

# this is the unique variable that must be changed for each library
FULL_LIBRARY_NAME=$(node -pe "require('./package.json').name")
# remove @abolis from package name
LIBRARY_NAME=${FULL_LIBRARY_NAME:8}

# directory of the library built on local machine
SCRIPT_PATH=$( cd "$(dirname "$0")" ; pwd -P )
PROJECT_ROOT=$(dirname "$(dirname "$(dirname "$SCRIPT_PATH")")")
LIBRARY_DIR="$PROJECT_ROOT/dist"

# directory of cypress
CYPRESS_DIR="$PROJECT_ROOT/cypress"

# get last release number from projects/searchzyme-client/package.json
releaseVersion=$(node -pe "require('./package.json').version")

# check that the release does not exist
cd $LIBRARY_DIR
if [[ -f "$LIBRARY_NAME.v.$releaseVersion.tar" ]]; then
  echo -e "\e[31mError : The release $LIBRARY_NAME.v.$releaseVersion.tar already exists. Change version in projects/$LIBRARY_NAME/package.json and retry!"
  exit 0
fi

# (re)build the library
ng build $FULL_LIBRARY_NAME

# copy cypress directory into /dist
cp -r $CYPRESS_DIR "$LIBRARY_DIR/$LIBRARY_NAME"

# zip the library built
tar zcf "$LIBRARY_NAME.v.$releaseVersion.tar" $LIBRARY_NAME
echo -e "\e[32mNew release (Version $releaseVersion) was processed with success! (/dist/$LIBRARY_NAME.v.$releaseVersion.tar)"

exit 0
