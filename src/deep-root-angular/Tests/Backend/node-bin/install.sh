#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../Backend/src/AsyncConfig ./node_modules &&\
ln -s ../../../Backend/src/Scheduler ./node_modules
