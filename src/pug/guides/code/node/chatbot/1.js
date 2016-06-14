const BeamClient = require('beam-client-node');
const BeamSocket = require('beam-client-node/lib/ws');

const client = new BeamClient();

let userInfo;

client.use('password', {
    username: 'your_username',
    password: 'your_password',
})
// runs the login request
.attempt()
// fetches connection info for the chat server
.then(response => {
    userInfo = response.body;
    return client.chat.join(response.body.channel.id);
})
.then(response => {
    const body = response.body;
    console.log(body);
    return createChatSocket(userInfo.id, userInfo.channel.id, body.endpoints, body.authkey);
})
.catch(error => {
    console.log('error joining chat:', error);
});
