const BeamClient = require('beam-client-node');
const BeamSocket = require('beam-client-node/lib/ws');

let userInfo;

const client = new BeamClient();

// With OAuth we don't need to login, the OAuth Provider will attach
// the required information to all of our requests after this call.
client.use('oauth', {
    token: {
        access: 'AUTH_TOKEN',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
});

// Get's the user we have access to with the token
client.request('GET', `users/current`)
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
    // TODO: Connect to chat.
})
.catch(error => {
    console.log('Something went wrong:', error);
});
