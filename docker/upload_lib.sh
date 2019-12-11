set -e

# http://gitlab.abolis.loc/abolis/services/tree/master/upload-server
UPLOAD_SERVER="http://worker.abolis.loc:25478"
DOWNLOAD_SERVER="http://worker.abolis.loc:8888"

TOKEN=${UPLOAD_TOKEN:-?}
if [ ${TOKEN} == "?" ]; then
  echo -e "\e[31mCan't proceed: please set UPLOAD_TOKEN as described in readme !"
  echo -e "If you are in CI, please set a custom environment variable for this project:\e[0m"
  echo "https://docs.gitlab.com/ee/ci/variables/#custom-environment-variables"
  exit 1
fi

if [ -z "$1" ]; then
  echo -e "\e[31mCan't proceed: please specify dist directory (eg: ./upload_lib.sh /yo/dist)\e[0m"
  exit 1
else
  DIST=$1
  # rely on the heavy assumption that there is only one .tar file here (should be ok in CI)
  TAR_FILENAME=$(cd ${DIST} && ls *.tar)
fi

# check that the release does not exist remotely
if curl -If "${DOWNLOAD_SERVER}/${TAR_FILENAME}" > /dev/null 2>&1; then
  echo -e "\e[31m${TAR_FILENAME} already exists at ${DOWNLOAD_SERVER}, aborting.\e[0m"
  exit 1
fi

echo "Uploading to ${UPLOAD_SERVER}"
if curl -f -Ffile="@${DIST}/${TAR_FILENAME}" "${UPLOAD_SERVER}/upload?token=${TOKEN}"; then
  echo -e "\e[32m\nSuccessfully uploaded ${TAR_FILENAME}"
  echo -e "You may now download your package at:\e[0m"
  echo "${DOWNLOAD_SERVER}/${TAR_FILENAME}"
else
  echo -e "\e[31mUpload failed, are you sure you have set UPLOAD_TOKEN as per readme ?\e[0m"
  echo "Removing ${DIST}/${TAR_FILENAME}"
  rm "${DIST}/${TAR_FILENAME}"
  exit 1
fi
