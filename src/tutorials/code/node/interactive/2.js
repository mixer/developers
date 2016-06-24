const beam = new Beam();
beam.use('password', {
    username,
    password,
})
.attempt()
.then(res => createRobot(res))
.then(robot => performRobotHandShake(robot))
.then(robot => setupRobotEvents(robot))
.catch(err => {
    throw new Error('Error connecting to Beam Interactive', err);
});
