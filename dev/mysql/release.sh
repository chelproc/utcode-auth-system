#!/bin/bash

cd $(dirname $0)
rm -rf ../../release/mysql/src
mkdir ../../release/mysql/src
cp -R ./conf.d ../../release/mysql/src/conf.d
cp -R ./initdb.d/structure ../../release/mysql/src/initdb.d