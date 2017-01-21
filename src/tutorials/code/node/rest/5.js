'use strict';

const Beam = require('beam-client-node');

const beam = new Beam();

const channelName = process.argv[2];

beam.request('GET', `channels/${channelName}`)
.then(res => {
    const viewers = res.body.viewersTotal;
    console.log(`You have ${viewers} total viewers...`);

    let rank = 1;
    const run = (page) => {
        return beam.request('GET', '/channels', {
            qs: {
                page,
                fields: 'viewersTotal',
                order: 'viewersTotal:DESC',
            },
        }).then(res => {
            for (let i = 0; i < res.body.length; i++) {
                const channel = res.body[i];
                if (channel.viewersTotal <= viewers) {
                    console.log(`Your rank on Beam is ${rank}!`);
                    return;
                }

                rank++;
            }

            console.log(`Your rank is at least ${rank}...`);
            return run(page + 1);
        });
    };

    return run(0);
});
