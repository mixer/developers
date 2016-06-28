'use strict';

const Beam = require('beam-client-node');
const username = process.argv[2];
const password = process.argv[3];

const beam = new Beam();

beam.use('password', {
    username,
    password,
})
.attempt()
.then(res => {
    const viewers = res.body.channel.viewersTotal;
    console.log(`You have ${viewers} total viewers...`);
});
