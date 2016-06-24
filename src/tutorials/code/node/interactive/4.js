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

function setupRobotEvents(robot) {
    robot.on('report', report => {
        const mouse = rjs.getMousePos();
        // If we have joystick information in the report
        if (report.joystick.length > 0) {
            // Apply the joystick to the current mouse position
            rjs.moveMouse(
                Math.round(mouse.x + 300 * report.joystick[0].coordMean.X),
                Math.round(mouse.y + 300 * report.joystick[0].coordMean.Y)
            );
        }
    });

    robot.on('error', err => {
        throw new Error('There was an error in the Interactive connection', err);
    });
}
