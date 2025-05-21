## development with Docker

My Mac is outdated and I cannot update ruby.

Docker used instead

https://github.com/envygeeks/jekyll-docker/blob/master/README.md

Use `shell/docker-jekyll-up.sh` to build an ecodesignmestre docker image.

## deployment

Use `shell/deploy-s3.sh` to deploy into AWS S3.


## Issue with sass map

`sourcemap: never` should be set, else a `_site/css/main.css` containing a sass map is generated.
 