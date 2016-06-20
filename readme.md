# Developers

Project used to generate contents of the [Developer Lab](http://beam.pro/lab).

## Requirements
- [Maven](https://maven.apache.org/)
- [Watchbeam/Backend](https://github.com/WatchBeam/backend )
- [Gulp](http://gulpjs.com/)

## Install
Run `npm i`

## Env variables
- `HOST_LOCATION` must always be set, example: `http://localhost`

## Build
Run `HOST_LOCATION=<your_host_location> gulp dist` for a full build.
Run `HOST_LOCATION=<your_host_location> gulp light-dist` for a build without JavaDoc and RAMLDoc
Run `HOST_LOCATION=<your_host_location> gulp watch` for development.

## Contribute
Run `npm test` before pull requesting any changes.
