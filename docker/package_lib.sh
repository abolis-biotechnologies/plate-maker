#!/bin/bash

set -e

CI_JOB_ID=${CI_JOB_ID:-?}
if [[ ${CI_JOB_ID} == "?" ]]; then
  echo -e "\e[31mCan't proceed: please 'git push' to build your next version of this project !\e[0m"
  exit 1
fi

LIBRARY_NAME=$(ls projects/@abolis)
DIST="dist"
orig_package_version=$(cd "projects/@abolis/${LIBRARY_NAME}" && node -pe "require('./package.json').version")
official_version=$(echo "${CI_COMMIT_MESSAGE}" | sed -rn "s/release ([0-9]+\.[0-9]+\.[0-9]+)$/\1/pI")

if [ -z "$official_version" ]; then
  # standard CI release
  # https://unix.stackexchange.com/questions/250740/replace-string-after-last-dot-in-bash
  releaseVersion="${orig_package_version%.*}.${CI_JOB_ID}"
else
  if [ "${official_version}" == "${orig_package_version}" ]; then
    releaseVersion=${official_version}
  else
    echo -e "\e[31mVersion in commit message doesn't match that of package.json\e[0m"
    exit 1
  fi
fi


TAR_FILENAME="$LIBRARY_NAME.v.$releaseVersion.tar"
# check that the release does not exist locally
if [[ -f ${DIST}/${TAR_FILENAME} ]]; then
  echo -e "\e[31mPackage ${TAR_FILENAME} already exists on disk, aborting.\e[0m"
  exit 0
fi

npm run build.lib

if [ -z "$official_version" ]; then
  # standard CI release, overwrite version patch in released package.json
  ORIGINAL="\"version\": \"${orig_package_version}\""
  REPLACEMENT="\"version\": \"${releaseVersion}\""
  sed -i "s/${ORIGINAL}/${REPLACEMENT}/g" "$DIST/$LIBRARY_NAME/package.json"
fi

# copy cypress directory into /dist
CYPRESS_DIR="cypress"
cp -r $CYPRESS_DIR "$DIST/$LIBRARY_NAME"
# you can remove duplicated files and non protable spec from Cypress directory by using
# rm "$DIST/$LIBRARY_NAME/cypress/...

# zip the library
( cd ${DIST} && tar zcf ${TAR_FILENAME} ${LIBRARY_NAME} )
echo -e "\e[32mSuccessfully built version $releaseVersion (dist/${TAR_FILENAME})\e[0m"
