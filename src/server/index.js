import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import Router from "react-router";

import DocumentationStore from "../api/store.js";
import Routes from "../components/routes.js";

export default class Server {
  constructor(port, documentationPath) {
    this.app = express();
    this.port = port;

    DocumentationStore.load(documentationPath);
  }

  start() {
    this.app.use(express.static(path.join(__dirname, '../../app/public')));
    this.app.use(require('connect-assets')({
      paths: [
        '../../__build__/assets/css', '../../bower_components'
      ].map(rel => { return path.join(__dirname, rel) })
    }));

    this.app.set("views", path.join(__dirname, "../../app/views"));
    this.app.set("view engine", "ejs");

    this.addRoutes();

    return this.app.listen(this.port);
  }

  addRoutes() {
    // TODO(tb): fixme
    this.app.get("/doc/chat/?", (_, res) => {
      let location = path.join(__dirname, "../../app/views/doc/chat/index.html");
      let contents = fs.readFileSync(location);

      res.send(contents.toString());
    });

    this.app.get("/doc/*", (req, res) => {
      let location = path.join(__dirname, "../../app/views" + req.url);
      let contents = fs.readFileSync(location);

      res.send(contents.toString());
    });

    this.app.get("*", (req, res) => {
      let router = Router.create({ location: req.url, routes: Routes });

      router.run((Handler) => {
        let page = React.renderToString(<Handler />);

        res.render("index.ejs", { page: page });
      });
    });
  }
}
