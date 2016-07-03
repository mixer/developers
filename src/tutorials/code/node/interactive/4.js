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
