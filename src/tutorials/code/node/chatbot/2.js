function createChatSocket (userId, channelId, endpoints, authkey) {
    const socket = new BeamSocket(endpoints).boot();

    // You don't need to wait for the socket to connect before calling methods,
    // we spool them and run them when connected automatically!
    socket.auth(channelId, userId, authkey)
    .then(() => {
        console.log('You are now authenticated!');
        // Send a chat message
        return socket.call('msg', ['Hello world!']);
    })
    .catch(error => {
        console.log('Oh no! An error occurred!', error);
    });

    // Listen to chat messages, not that you will also receive your own!
    socket.on('ChatMessage', data => {
        console.log('We got a ChatMessage packet!');
        console.log(data);
        console.log(data.message); // lets take a closer look
    });

    // Listen to socket errors, you'll need to handle these!
    socket.on('error', error => {
        console.error('Socket error', error);
    });
}
