#!/bin/zsh

JEKYLL_VERSION=3.6

docker rm ecodesignmestre

rm Gemfile.lock

docker run \
  --volume="$PWD:/srv/jekyll" \
  --publish=4000:4000 \
  --name=ecodesignmestre \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  sh -c "chown -R jekyll /usr/gem/ && jekyll serve --trace"