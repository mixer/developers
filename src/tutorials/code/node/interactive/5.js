const Beam = require('beam-client-node');
const Interactive = require('beam-interactive-node');
const rjs = require('robotjs');

const channelId = 1234;

const beam = new Beam();

beam.use('oauth', {
    tokens: {
        access: 'AUTH_TOKEN',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
});

beam.request('GET', `users/current`)
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
            const mean = report.joystick[0].coordMean;
            if (!isNaN(mean.x) && !isNaN(mean.y)) {
                rjs.moveMouse(
                    Math.round(mouse.x + 300 * mean.x),
                    Math.round(mouse.y + 300 * mean.y)
                );
            }
        }
    });
    robot.on('error', err => {
        throw new Error('There was an error in the Interactive connection', err);
    });
}
