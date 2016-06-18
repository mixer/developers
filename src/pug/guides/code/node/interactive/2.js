const beam = new Beam();
beam.use('password', {
    username,
    password,
})
.attempt()
.then(() => beam.game.join(stream))
.then(res => createRobot(res, stream))
.then(robot => handleRobotConnection(robot));
