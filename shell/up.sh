#!/bin/zsh

JEKYLL_VERSION=4.0

docker run \
  --volume="$PWD:/srv/jekyll" \
  --publish=4000:4000 \
  -it jekyll/jekyll:$JEKYLL_VERSION \
  sh -c "chown -R jekyll /usr/gem/ && jekyll serve --trace"