/**
 * Details passed into client-sessions. See full options on the
 * linked page.
 * @see https://github.com/mozilla/node-client-sessions
 */
exports.cookie = {
    cookieName: 'auth',
    secret: 'changeme',
    duration: 1000 * 60 * 60 * 24
};

/**
 * OAuth details for the developers site itself.
 */
exports.oauth = {
    clientId: 'developers-site',
    secret: 'foobar'
};

/**
 * Config about the developer site server.
 */
exports.server = {
    port: 9393,
    // Public URL this server is accessible on:
    url: 'https://developer.beam.pro'
};

/**
 * Link to beam frontend and backends.
 */
exports.url = {
    api: 'https://beam.pro/api/v1',
    public: 'https://beam.pro'
};
