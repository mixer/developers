import Bluebird from 'bluebird';
import React from "react";
import Routes from "../../components/routes.js";
import Router from "react-router";
import fs from "fs";

import multer from "multer";

const upload = multer({ dest: require('os').tmpdir() });
const logoUpload = Bluebird.promisify(upload.single('logo'));

export function render (req, res, params={}) {
  let router = Router.create({ location: req.url, routes: Routes });

  router.run((Handler, state) => {
    if (state.routes.length === 0) {
      res.render("404.ejs");
    } else {
      let page = React.renderToString(<Handler session={req.auth} {...params}/>);

      res.render("index.ejs", { page: page });
    }
  });
}

export function oauthManage (req, res) {
  req.beam
    .request('get', '/users/' + req.auth.userId + '/oauth/clients')
    .then((result) => render(req, res, { clients: result.body }))
    .catch((e) => showError(e, res));
}

export function oauthEdit (req, res) {
  if (req.params.id) {
    return req.beam
      .request('get', '/oauth/clients/' + req.params.id)
      .then((result) => render(req, res, {
        client: result.body,
        invalid: req.invalid
      }))
      .catch((e) => showError(e, res));
  }

  render(req, res, { invalid: req.invalid })
}

export function oauthDelete (req, res) {
  return req.beam
    .request('delete', '/oauth/clients/' + req.params.id)
    .then(() => res.redirect('/oauth/manage'))
    .catch((e) => showError(e, res));
}

export function oauthSave (req, res) {
  const id = req.body.id;
  req.params.id = id;

  function handleResponse (resp) {
    const { statusCode, body } = resp;

    if (statusCode === 200) {
      return res.redirect('/oauth/manage');
    }
    if (statusCode === 400) {
      const errs = req.invalid = {};
      body.forEach((err) => {
        errs[err.path.split('.').shift()] = err.message;
      });

      return oauthEdit(req, res);
    }

    showError({ statusCode, body });
  }

  let promise;
  if (id) {
    delete req.body.id;
    promise = req.beam.request('put', '/oauth/clients/' + id, {
      formData: req.body
    });
  } else {
    promise = logoUpload(req, res)
      .then(() => {
        return req.beam.request('post', '/oauth/clients', {
          formData: {
            logo: {
              value: fs.createReadStream(req.file.path),
              options: {
                contentType: req.file.mimetype,
                filename: req.file.originalname
              }
            },
            name: req.body.name,
            website: req.body.website,
            hosts: req.body.hosts,
            secret: req.body.secret ? '1' : ''
          }
        });
      });
  }

  promise
    .then(handleResponse)
    .catch((e) => showError(e, res))
    .finally(() => {
      if (req.file) fs.unlink(req.file.path, () => {});
    });
}

function showError(err, res) {
    console.error(err.stack);
    res.status(500).send('Internal server error.');
}
