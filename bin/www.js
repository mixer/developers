#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var packageInfo = require('../package.json');

program
    .version(packageInfo.version)
    .option('-C, --cores [number]', 'number of child processes to spin out')
    .option('-A, --address [address]', 'the ip:port to listen for connections on', '');

program.name = 'beam-developers';

program
    .command('serve')
    .description('boots a web docs server')
    .action(function () {
        var parts = program.address.split(':');
        require('../lib/server')(program.cores, parts[0], parts[1]);
    });


// If we were not passed any commands or flags in, display the help.
if (process.argv.length === 2) {
    process.argv.push('--help');
}

// Run the program
program.parse(process.argv);
