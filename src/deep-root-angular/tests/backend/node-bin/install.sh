#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
npm link babel-preset-es2015 &&\
ln -s ../../../backend/src/async-config ./node_modules &&\
ln -s ../../../backend/src/scheduler ./node_modules &&\
ln -s ../../../backend/src/ddb-eventual-consistency ./node_modules
