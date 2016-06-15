# Developers

Project used to generate contents of [http://beam.pro/lab Lab]

## Requirements
- [https://maven.apache.org/ Maven]
- [https://github.com/WatchBeam/backend Watchbeam/Backend]
- [http://gulpjs.com/ Gulp]

## Install
Run `npm i`

## Env variables
- `HOST_LOCATION` must always be set, example: `http://localhost`

## Build
Run `HOST_LOCATION=<your_host_location> gulp dist` for a full build.
Run `HOST_LOCATION=<your_host_location> gulp light-dist` for a build without JavaDoc and RAMLDoc
Run `HOST_LOCATION=<your_host_location> gulp watch` for development.
