#!/usr/bin/env bash

set -e

# sets the version number correctly everywhere that it needs to be set
# usage: ./version.bash X.Y.Z

if [[ $# -ne 1 ]]; then
  echo >&2 "usage: $(basename "$0") X.Y.Z"
  exit 1
fi

if [[ $(uname) == Darwin ]]; then
  SED=gsed
else
  SED=sed
fi

jq ".version |= \"$1\"" < package.json | sponge package.json
npm install

$SED -i -e "s/.version=.*/.version=$1/" Dockerfile
$SED -i -e "s/version: '.*'/version: '$1'/" src/routes/version/+server.ts

exit 0
