import React from "react"
import Router from "react-router"
const { Route, DefaultRoute, RouteHandler } = Router;

import Application from "./app.js";
import Index from "./index_page.js";
import APIReferencePage from "./api_reference_page.js";
import GuidePage from "./guide_page.js";
import WidgetPage from "./widget_page_component.js";
import ChatProtoPage from "./chatproto_page_component.js";
import * as OAuthManage from "./oauth_manage";

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <Route name="reference" path="api/v1/:name?" handler={APIReferencePage}/>
    <Route name="guides" path="api/guides/:name?" handler={GuidePage}/>
    <Route name="widgets" path="api/widgets" handler={WidgetPage}/>
    <Route name="chatproto" path="api/chat" handler={ChatProtoPage}/>
    <Route name="oauthList" path="oauth/manage" handler={OAuthManage.List}/>
    <Route name="oauthEdit" path="oauth/edit/:id" handler={OAuthManage.Edit}/>
    <Route name="oauthCreate" path="oauth/edit" handler={OAuthManage.Edit}/>
    <DefaultRoute handler={Index} />
  </Route>
)
