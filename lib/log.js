var config = require('../config/config');
var bunyan = require('bunyan');

// The base transport will be the process stdout
var transports = [{
    level: process.env.LOG_LEVEL || 'debug',
    stream: process.stdout
}];

// If a sentry dsn was provided in the config, then create a new transport
// for Sentry logs.
if (config.log.sentryDsn) {
    var client = new (require('raven')).Client(config.logs.sentryDsn);
    var raven = require('bunyan-raven');
    transports.push({
        type: 'raw',
        stream: new raven(client),
        level: 'info'
    });
}

// Finally, inject these into a Bunyan logger and export it.
var logger = module.exports = bunyan.createLogger({
    name: 'beam-developers',
    streams: transports
});

// Capture uncaught exceptions and log them to Bunyan. Then exit.
process.on('uncaughtException', function (err) {
    logger.error(err);

    // State is contaminated, we should shut down. Currently nothing that
    // needs graceful shutting down, so we can just exit safely.
     process.exit(1);
});
