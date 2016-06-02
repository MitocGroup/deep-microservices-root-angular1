#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../backend/src/async-config ./node_modules &&\
ln -s ../../../backend/src/scheduler ./node_modules
