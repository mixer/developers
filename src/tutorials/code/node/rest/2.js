'use strict';

const Mixer = require('beam-client-node');

const client = new Mixer.Client();

const channelName = process.argv[2];

client.request('GET', `channels/${channelName}`)
.then(res => {
    const viewers = res.body.viewersTotal;
    console.log(`You have ${viewers} total viewers...`);
});
