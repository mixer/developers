import Client from '../lib/beam';

/**
 * This middleware function attaches a Beam client to the request
 * at `req.beam`. If the user is authenticated, then the client will
 * be fulfilled the oauth details stored in the session.
 *
 * @param  {Express.Request}   req
 * @param  {Express.Response}   res
 * @param  {Function} next
 */
export default function (req, res, next) {
    if (!req.auth) {
        throw new Error('Expected to find a session object in req.auth,' +
                        'but none was found. Middleware is screwed up.');
    }

    const client = req.beam = Client();
    const tokens = req.auth.tokens;

    if (tokens) {
        const provider = client.getProvider();
        provider.tokens = req.auth.tokens;
        req.auth.isAuthed = provider.isAuthenticated();
    }


    next();
};
