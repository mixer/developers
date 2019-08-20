# Developers [![Join the chat at https://gitter.im/Mixer/developers](https://badges.gitter.im/Mixer/developers.svg)](https://gitter.im/Mixer/developers?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Legacy Project used to generate contents of the [Developer Documentation](https://dev.mixer.com).

Not currently in use.

## Requirements

- [Gulp](http://gulpjs.com/)
- [node](https://nodejs.org/en/)
- Git

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
