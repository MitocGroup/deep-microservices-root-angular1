#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../Backend/src/async-config ./node_modules &&\
ln -s ../../../Backend/src/scheduler ./node_modules
