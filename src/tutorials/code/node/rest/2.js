'use strict';

const Beam = require('beam-client-node');

const beam = new Beam();

beam.use('oauth', {
    tokens: {
        access: 'AUTH_TOKEN',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
});

client.request('GET', `users/current`)
.then(res => {
    const viewers = res.body.channel.viewersTotal;
    console.log(`You have ${viewers} total viewers...`);
});
