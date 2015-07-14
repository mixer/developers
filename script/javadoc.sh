#!/bin/bash

function main() {
  mkdir .tmp;
  git clone https://github.com/WatchBeam/beam-client-java .tmp/beam-client-java;
  cd .tmp/beam-client-java;
  mvn clean javadoc:javadoc;
  cp -R ./target/site/apidocs/ ../../app/views/doc/java-client;
  cd ../../;
  rm -rf .tmp/;
}

main;
