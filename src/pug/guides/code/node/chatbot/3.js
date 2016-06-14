const BeamClient = require('beam-client-node');
const BeamSocket = require('beam-client-node/lib/ws');

let userInfo;

const client = new BeamClient();

client.use('password', {
    username: 'your_username',
    password: 'your_password',
})
.attempt()
.then(response => {
    userInfo = response.body;
    return client.chat.join(response.body.channel.id);
})
.then(response => {
    // Chat connection
    const socket = new BeamSocket(response.body.endpoints).boot();

    // Greet a joined user
    socket.on('UserJoin', data => {
        socket.call('msg', [`Hi ${data.username}! I'm pingbot! Write !ping and I will pong back!`]);
    });

    // React to our !pong command
    socket.on('ChatMessage', data => {
        if (data.message.message[0].data.toLowerCase().startsWith('!ping')) {
            socket.call('msg', [`@${data.user_name} PONG!`]);
            console.log(`Ponged ${data.user_name}`);
        }
    });

    // Handle errors
    socket.on('error', error => {
        console.error('Socket error', error);
    });

    return socket.auth(userInfo.channel.id, userInfo.id, response.body.authkey)
    .then(() => {
        console.log('Login successful');
        return socket.call('msg', ['Hi! I\'m pingbot! Write !ping and I will pong back!']);
    });
})
.catch(error => {
    console.log('Something went wrong:', error);
});
