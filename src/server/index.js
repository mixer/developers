import express from "express";
import path from "path";
import React from "react";
import Router from "react-router";

import Routes from "../components/routes.js";

exports.start = (port) => {
  let app = express();

  app.use(require('connect-assets')({
    paths: [
      '../../__build__/assets/css'
    ].map(rel => { return path.join(__dirname, rel) })
  }));

  app.set("views", path.join(__dirname, "../../app/views"));
  app.set("view engine", "ejs");

  app.get("*", (req, res) => {
    let router = Router.create({ location: req.url, routes: Routes });
    router.run((Handler) => {
      let page = React.renderToString(<Handler />);
      res.render("index.ejs", { page: page });
    });
  });

  return app.listen(port);
}

