# !/bin/bash

aws s3 cp ./_site s3://www.ecodesignmestre.com --recursive --acl public-read