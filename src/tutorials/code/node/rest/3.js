// ...
let rank = 1;
const run = (page) => {
    return getChannelsDescending(page).then(res => {
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
// ...
