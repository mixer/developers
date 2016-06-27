# Developers
Project used to generate contents of the [Developer Lab](http://beam.pro/lab).

## Requirements
- [Maven](https://maven.apache.org/)
- [Gulp](http://gulpjs.com/)

## Install
Run `npm i` with Node v4.

## Config
We use `node-config`, please refer to `config/default.yaml` for more info.

In order to use local repositories (such as backend for fast raml doc preview).
You need to specify the `repos` section in the config such as this:

```yaml
    repos:
        backend: ../backend
```


## Build
Run `gulp` for a full build.
Run `gulp compile` for a build without JavaDoc and RAMLDoc.
Run `gulp watch` for development.

## Contribute
Run `npm test` before pull requesting any changes.
