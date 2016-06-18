function handleRobotConnection(robot) {
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
