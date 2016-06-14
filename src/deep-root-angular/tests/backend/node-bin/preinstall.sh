#!/bin/bash

[ -e "./node_modules/deepify" ] && rm -f "./node_modules/deepify";

[ -e "./node_modules/async-config" ] && rm -f "./node_modules/async-config";

[ -e "./node_modules/scheduler" ] && rm -f "./node_modules/scheduler";

[ -e "./node_modules/ddb-eventual-consistency" ] && rm -f "./node_modules/ddb-eventual-consistency";


exit 0
