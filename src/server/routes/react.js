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

function showError(err, res) {
    console.error(err.stack);
    res.status(500).send('Internal server error.');
}
