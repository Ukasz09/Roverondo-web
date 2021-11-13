#!/bin/bash

cd ../../../

PACKAGE_VERSION=$(cat ./package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
image_name="ukasz09/roverondo-web-prod-prebuilt"
new_tag="$image_name:$PACKAGE_VERSION"
latest_tag="$image_name:latest"

function push_and_delete {
  tag=$1
  docker push $tag
  docker rmi $tag
}

docker build -f deployment/production/Dockerfile --tag $new_tag .
docker tag $new_tag $latest_tag
  push_and_delete $new_tag
  push_and_delete $latest_tag

