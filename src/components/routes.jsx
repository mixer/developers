import React from "react"
import Router from "react-router"
const { Route, DefaultRoute, RouteHandler } = Router;

import Application from "./app.js";
import TestPage from "./test_page.js";
import Index from "./index_page.js";

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <Route name="test" path="/test" handler={TestPage}/>
    <DefaultRoute handler={Index} />
  </Route>
)
