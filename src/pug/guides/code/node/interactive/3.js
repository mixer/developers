function createRobot(res, stream) {
    return new Tetris.Robot({
        remote: res.body.address,
        channel: stream,
        key: res.body.key,
    });
}
