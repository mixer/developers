import React from "react"
import Router from "react-router"
const { Route, DefaultRoute, RouteHandler } = Router;

import Application from "./app.js";
import Index from "./index_page.js";

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <DefaultRoute handler={Index} />
  </Route>
)
