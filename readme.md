# Developers [![Join the chat at https://gitter.im/Mixer/developers](https://badges.gitter.im/Mixer/developers.svg)](https://gitter.im/Mixer/developers?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Project used to generate contents of the [Developer Documentation](https://dev.mixer.com).

## Requirements

- [Gulp](http://gulpjs.com/)
- [node](https://nodejs.org/en/)
- Git

## Contributing

### Getting Setup
1. Clone this repository
1. Run `npm i`
1. Install http-server globally with `npm i -g http-server`
1. Do an initial build with `npm run build`
1. Setup the watcher, this will rebuild stuff as you work with `npm run watch`
1. In another window run: `npm run start` this will start a local copy of the developer site
1. The output of the start command will show you were you can reach it on your machine.

### Outside Developers

If you don't have access to our internal repositories, just use `gulp recompile` to build the reference and tutorial sections.
Run `npm test` before pull requesting any changes.

## Config

We use `node-config`, please refer to `config/default.yaml` for more info.

In order to use local repositories (such as backend for fast raml doc preview).
You need to specify the `repos` section in the config such as this:

```yaml
    repos:
        backend: ../backend
```

## Build Scripts

Run `npm run build` for a full build.

Run `gulp recompile` for a build without JavaDoc and RAMLDoc. This will also work for 3rd parties looking to contribute.

Run `gulp watch` for development.

Run `npm start` to start a local server at port 8000.
