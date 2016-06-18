const Beam = require('beam-client-node');
const Tetris = require('beam-interactive-node');
const rjs = require('robotjs');

const stream = 1234;
const username = 'connor';
const password = 'password';

const beam = new Beam();

beam.use('password', {
    username,
    password,
})
.attempt()
.then(() => beam.game.join(stream))
.then(res => createRobot(res))
.then(robot => handleRobotConnection(robot));

function createRobot (res) {
    return new Tetris.Robot({
        remote: res.body.address,
        channel: stream,
        key: res.body.key,
    });
}

function handleRobotConnection (robot) {
    robot.handshake(err => {
        if (err) throw new Error('Error connecting to Tetris', err);
    });

    robot.on('report', report => {
        const mouse = rjs.getMousePos();
        if (report.joystick.length > 0) {
            rjs.moveMouse(
                Math.round(mouse.x + 300 * report.joystick[0].coordMean.X),
                Math.round(mouse.y + 300 * report.joystick[0].coordMean.Y)
            );
        }
    });
}
