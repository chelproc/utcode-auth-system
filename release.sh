#!/bin/bash

cd $(dirname $0)
for file in $(find ./dev/*/release.sh); do
    bash "$file"
done