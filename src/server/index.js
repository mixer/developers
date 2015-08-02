import express from "express";
import path from "path";
import config from "config";
import React from "react";
import Router from "react-router";

import DocumentationStore from "../api/store.js";

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
    this.app.use(require('client-sessions')(config.get('cookie')));
    this.app.use(require('./auth')); // important: auth is registered after session

    this.app.set("views", path.join(__dirname, "../../app/views"));
    this.app.set("view engine", "ejs");

    this.addRoutes();

    return this.app.listen(this.port);
  }

  routeFile(route, location) {
    const file = path.join(__dirname, "../../app/views/", location);
    this.app.get(route, (_, res) => res.sendFile(file));
  }

  addRoutes() {
    this.routeFile("/doc/chat/?", "doc/chat/index.html");
    this.routeFile("/doc/java-client/?", "doc/java-client/index.html");

    this.app.get("/login/redirect", require('./routes/login').redirect);
    this.app.get("/login/attempt", require('./routes/login').attempt);
    this.app.get("/doc/*", require('./routes/doc'));
    this.app.get("*", require('./routes/catchall'));
  }
}
