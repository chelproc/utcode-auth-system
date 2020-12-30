#!/bin/bash

cd $(dirname $0)
rm -rf ../../release/members-api/src
mkdir ../../release/members-api/src
cp -R ./app/release ./app/package.json ./app/package-lock.json ../../release/members-api/src