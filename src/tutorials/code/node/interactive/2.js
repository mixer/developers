const beam = new Beam();
beam.use('password', {
    username,
    password,
})
.attempt()
.then(() => beam.game.join(channelId))
.then(res => createRobot(res))
.then(robot => performRobotHandShake(robot))
.then(robot => setupRobotEvents(robot))
.catch(err => {
    if (err.res) {
        throw new Error('Error connecting to Interactive:' + err.res.body.mesage);
    }
    throw new Error('Error connecting to Interactive', err);
});
