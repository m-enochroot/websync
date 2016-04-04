#!/bin/bash
set -ev

rm -rf ./dist

# Build the webapp to be deployed from source
grunt build

# Copy openshift specific files
cp -Rf ./deployment/openshift ./dist/

# Initialize Git local repository
cd ./dist
git init
git status
git config --global push.default simple
git config --global user.email "travis@travis-ci.com"
git config --global user.name "Travis CI"
git checkout -b master
git remote add origin ssh://56c8f70b0c1e66171300004d@gateway-gfitls.rhcloud.com/~/git/gateway.git
git add --all
git commit -am "Travis deploy"
