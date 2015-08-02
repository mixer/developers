import React from "react";
import Routes from "../../components/routes.js";
import Router from "react-router";

export default function (req, res) {
  let router = Router.create({ location: req.url, routes: Routes });

  router.run((Handler) => {
    let page = React.renderToString(<Handler />);

    res.render("index.ejs", { page: page });
  });
}
