import {OAuth2} from 'oauth';
import config from 'config';

const client = new OAuth2(
    config.get('oauth.clientId'),
    config.get('oauth.clientSecret'),
    config.get('apiUrl'),
    '/oauth/authorize',
    '/oauth/token',
);

export function (req, res) {
    if (req.query.code) {
        // Looks like they're returning from a successful authorization.
        client.getOAuthAccessToken(req.query.code, {}, function (err, token) {
            req.auth.token = token;
        });
    }
}
