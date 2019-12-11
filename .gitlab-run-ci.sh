
set -e

DOCKER_NETWORK=e2e_net
APP_CONTAINER=plate-maker
APP_PORT=80

# 0. create network if it doesn't exist https://stackoverflow.com/a/48643576/
docker network create --driver bridge ${DOCKER_NETWORK} || true

# 1 start frontend
docker run -d --rm \
  --name ${APP_CONTAINER} \
  --network=${DOCKER_NETWORK} \
  ${APP_IMAGE}

# 2. run cypress specs !
# The reason behind using the flag --ipc=host is that Cypress crashes when renderer process eats up too much memory
# https://github.com/cypress-io/cypress/issues/350
docker run --rm \
  --name plate-maker-cypress \
  --network=${DOCKER_NETWORK} \
  --ipc=host \
  -e CYPRESS_baseUrl=http://${APP_CONTAINER}:${APP_PORT} \
  ${CYPRESS_IMAGE} \
  bash -c "\$(npm bin)/cypress run --spec \"${SPECS}\""
