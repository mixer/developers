'use strict';

const Beam = require('beam-client-node');
const username = process.argv[2];
const password = process.argv[3];

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
