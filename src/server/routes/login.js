import config from 'config';

/**
 * Permissions we intend to request over oauth;
 */
const permissions = ['oauth:manage:self'];

/**
 * Returns the redirect URL we send to OAuth. Clients will be
 * redirected back here after authorizing or denying.
 * @return {String}
 */
function buildRedirect () {
    return config.get('server.url') + '/login/attempt';
}

/**
 * Route to redirect the user to the main Beam site for
 * authentication.
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 */
export function redirect (req, res) {
    var url = req.beam.getProvider()
        .getRedirect(buildRedirect(), permissions);

    res.redirect(url);
}

/**
 * Route users should return to after doing authentication stuff.
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 */
export function attempt (req, res) {
    req.beam.getProvider()
        .attempt(buildRedirect(), req.query)
        .then(function () {
            res.redirect('/');
        })
        .catch(function (e) {
            console.error(e);
            res.status(400).send('There was an error authenticating you :(');
        });
}
