const beam = new Beam();

beam.use('oauth', {
    tokens: {
        access: 'AUTH_TOKEN',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
});

client.request('GET', `users/current`)
.then(() => beam.game.join(channelId))
.then(res => createRobot(res))
.then(robot => performRobotHandShake(robot))
.then(robot => setupRobotEvents(robot))
.catch(err => {
    if (err.res) {
        throw new Error('Error connecting to Interactive:' + err.res.body.message);
    }
    throw new Error('Error connecting to Interactive', err);
});
