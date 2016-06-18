const beam = new Beam();
beam.use('password', {
    username,
    password,
})
.attempt()
.then(() => beam.game.join(channelId))
.then(res => createRobot(res, channelId))
.then(robot => handleRobotConnection(robot));
