import Client from '../lib/beam';

/**
 * This middleware function will prevent access of the associated
 * routes when not authenticated.
 *
 * @param  {Express.Request}   req
 * @param  {Express.Response}   res
 * @param  {Function} next
 */
export default function (req, res, next) {
    if (!req.auth.isAuthed) {
        res.redirect('/login/redirect');
    } else {
        next();
    }
};
