'use strict';

const Beam = require('beam-client-node');

const beam = new Beam();

const channelName = process.argv[2];

beam.request('GET', `channels/${channelName}`)
.then(res => {
    const viewers = res.body.channel.viewersTotal;
    console.log(`You have ${viewers} total viewers...`);
});
