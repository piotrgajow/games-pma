#!/bin/bash

while read line
do
  if [[ $line != \#* ]] && [[ ! -z $line ]]
  then
    export $line
  fi
done < .env

node ./dist/main &
