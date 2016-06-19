function handleRobotConnection(robot) {
    robot.handshake(err => {
        if (err) throw new Error('Error connecting to Tetris', err);
    });

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
}
