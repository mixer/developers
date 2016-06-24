const Beam = require('beam-client-node');
const Interactive = require('beam-interactive-node');
const rjs = require('robotjs');

const channelId = 1234;
const username = 'username';
const password = 'password';

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
    throw new Error('Error connecting to Beam Interactive', err);
});

function createRobot (res) {
    return new Interactive.Robot({
        remote: res.body.address,
        channel: channelId,
        key: res.body.key,
    });
}

function performRobotHandShake (robot) {
    return new Promise((resolve, reject) => {
        robot.handshake(err => {
            if (err) {
                reject(err);
            }
            resolve(robot);
        });
    });
}
function setupRobotEvents (robot) {
    robot.on('report', report => {
        const mouse = rjs.getMousePos();
        if (report.joystick.length > 0) {
            if (!isNan(report.joystick[0].coordMean.X) && !isNan(report.joystick[0].coordMean.Y)) {
                rjs.moveMouse(
                    Math.round(mouse.x + 300 * report.joystick[0].coordMean.X),
                    Math.round(mouse.y + 300 * report.joystick[0].coordMean.Y)
                );
            }
        }
    });
    robot.on('error', err => {
        throw new Error('There was an error in the Interactive connection', err);
    });
}
