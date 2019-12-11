
DIST="dist"
# rely on the heavy assumption that there is only one .tar file here (should be ok in CI)
TARFILE=$(cd ${DIST} && ls *.tar)

ORIGINAL="\"dependencies\": {"
REPLACEMENT="\"dependencies\": {\n    \"@abolis\/plate-maker\": \"file:${DIST}\/${TARFILE}\","

sed -i "s/${ORIGINAL}/${REPLACEMENT}/g" package.json
