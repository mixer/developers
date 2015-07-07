import React from "react"
import Router from "react-router"
const { Route, DefaultRoute, RouteHandler } = Router;

import Application from "./app.js";
import Index from "./index_page.js";
import APIReferencePage from "./api_reference_page.js";
import WidgetPage from "./widget_page_component.js";

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <Route name="reference" path="api/v1/:name?" handler={APIReferencePage}/>
    <Route name="widgets" path="api/widgets" handler={WidgetPage}/>
    <DefaultRoute handler={Index} />
  </Route>
)
