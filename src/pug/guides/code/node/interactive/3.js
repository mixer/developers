function createRobot(res, stream) {
    return new Tetris.Robot({
        remote: res.body.address,
        channel: channelId,
        key: res.body.key,
    });
}
