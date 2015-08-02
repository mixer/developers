import React from "react";
import Routes from "../../components/routes.js";
import Router from "react-router";

export function render (req, res, params={}) {
  let router = Router.create({ location: req.url, routes: Routes });

  router.run((Handler) => {
    let page = React.renderToString(<Handler session={req.auth} {...params}/>);

    res.render("index.ejs", { page: page });
  });
}

export function oauthManage (req, res) {
    req.beam
        .request('get', '/users/current', { query: { fields: 'id' }})
        .then((result) => req.beam.request('get', '/users/' + result.body.id + '/oauth/clients'))
        .then((result) => render(req, res, { clients: result.body }))
        .catch((e) => showError(e, res));
}

function showError(err, res) {
    console.error(err);
    res.status(500).send('Internal server error.');
}
