var config = require('../../config/config');

/**
 * Boots a web server, on the given number of threads.
 *
 * @param {Number=} number
 * @param {Number=} port
 * @param {String=} Host
 */
module.exports = function (number, port, host) {
    // Start listening for connections!
    require('./express.js').listen(
        port || config.http.port,
        host || config.http.host
    );
};
