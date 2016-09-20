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
    console.log(response.body);
    // Store the logged in user's details for later refernece
    userInfo = response.body;
    // Returns a promise that resolves with our chat connection details.
    return client.chat.join(response.body.channel.id);
})
.then(response => {
    const body = response.body;
    console.log(body);
    // return createChatSocket(userInfo.id, userInfo.channel.id, body.endpoints, body.authkey);
})
.catch(error => {
    console.log('Something went wrong:', error);
});
