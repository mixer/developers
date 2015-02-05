var cluster = require('cluster');
var log = require('../log');
var config = require('../../config/config');

/**
 * Boots a web server, on the given number of threads.
 *
 * @param {Number=} number
 * @param {Number=} port
 * @param {String=} Host
 */
module.exports = function (number, port, host) {
    if (process.env.NODE_ENV === 'production' && cluster.isMaster) {
        // If this is the master of the server, spin out subprocesses. We'll
        // just sit by and let this manage all its workers.
        var numCPUs = number || require('os').cpus().length;
        for (var i = numCPUs; i > 0; i--) {
            cluster.fork();
        }
        cluster.on('exit', function (worker, code, signal) {
            log.warn('Worker died. Rebooting a new one in one second.', {
                code: code,
                signal: signal
            });

            setTimeout(cluster.fork, 1000);
        });
    } else {
        // Otherwise, start listening for connections!
        require('./express.js').listen(
            port || config.http.port,
            host || config.http.host
        );
    }
};
