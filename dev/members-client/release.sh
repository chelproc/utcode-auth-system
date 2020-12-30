#!/bin/bash

cd $(dirname $0)
rm -rf ../../release/members-client/src
cp -R ./app/dist ../../release/members-client/src