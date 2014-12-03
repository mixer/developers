var cluster = require('cluster');

if (cluster.isMaster) {
    // If this is the master of the server, spin out subprocesses. We'll
    // just sit by and let this manage all its workers.
    var numCPUs = require("os").cpus().length;
    for (var i = numCPUs; i > 0; i--) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        log.warn('Worker died. Rebooting a new one in one second.', { code: code, signal: signal});
        setTimeout(cluster.fork, 1000);
    });
} else {
    // Otherwise, start listening for connections!
    require('./lib/server.js').listen();
}
