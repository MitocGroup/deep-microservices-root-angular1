#!/usr/bin/env bash

source $(dirname $0)/_head.sh

### Run Coverage ###

__CMD='npm run coverage'

subpath_run_cmd ${__SRC_PATH} "$__CMD" "Frontend"
subpath_run_cmd ${__SRC_PATH} "$__CMD" "Backend"

### Merge Coverage results ###
istanbul-combine -d ${__COVERAGE_PATH} -r lcov -p both \
  ${__SRC_PATH}Frontend/coverage/*/*.json

### Upload Coverage info to Codacy ###
cd ${__COVERAGE_PATH}
ls -l

cat ${__COVERAGE_PATH}"/lcov.info" | codacy-coverage
cat ${__COVERAGE_PATH}"/lcov.info" | coveralls
#
#### Cleanup! ###
#
#__CMD='rm -rf ./coverage'
#
#subpath_run_cmd ${__SRC_PATH} "$__CMD"
