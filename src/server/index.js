import express from "express";
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

  route(route, location) {
    const file = path.join(__dirname, "../../app/views/", location);
    this.app.get(route, (_, res) => {
      res.sendFile(file);
    });
  }

  addRoutes() {
    this.route("/doc/chat/?", "doc/chat/index.html");
    this.route("/doc/java-client/?", "doc/java-client/index.html");

    this.app.get("/doc/*", (req, res) => {
      let location = path.join(__dirname, "../../app/views" + req.url);
      try {
        if (/\.css$/.exec(location) !== null) res.set("Content-Type", "text/css");
        res.sendFile(location);
      } catch (_) { res.status(404).end() }
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
