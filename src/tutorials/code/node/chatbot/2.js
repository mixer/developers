const Mixer = require('beam-client-node');
const ws = require('ws');

let userInfo;

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

// With OAuth we don't need to log in. The OAuth Provider will attach
// the required information to all of our requests after this call.
client.use(new Mixer.OAuthProvider(client, {
    tokens: {
        access: 'AUTH_TOKEN',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));

// Gets the user that the Access Token we provided above belongs to.
client.request('GET', `users/current`)
.then(response => {
    console.log(response.body);

    // Store the logged in user's details for later refernece
    userInfo = response.body;

    // Returns a promise that resolves with our chat connection details.
    return new Mixer.ChatService(client).join(response.body.channel.id);
})
.then(response => {
    const body = response.body;
    console.log(body);
    return createChatSocket(userInfo.id, userInfo.channel.id, body.endpoints, body.authkey);
})
.catch(error => {
    console.error('Something went wrong.');
    console.error(error);
});

/**
 * Creates a Mixer chat socket and sets up listeners to various chat events.
 * @param {number} userId The user to authenticate as
 * @param {number} channelId The channel id to join
 * @param {string[]} endpoints An array of endpoints to connect to
 * @param {string} authkey An authentication key to connect with
 * @returns {Promise.<>}
 */
function createChatSocket (userId, channelId, endpoints, authkey) {
    const socket = new Mixer.Socket(ws, endpoints).boot();

    // You don't need to wait for the socket to connect before calling
    // methods. We spool them and run them when connected automatically.
    socket.auth(channelId, userId, authkey)
    .then(() => {
        console.log('You are now authenticated!');
        // Send a chat message
        return socket.call('msg', ['Hello world!']);
    })
    .catch(error => {
        console.error('Oh no! An error occurred.');
        console.error(err);
    });

    // Listen for chat messages. Note you will also receive your own!
    socket.on('ChatMessage', data => {
        console.log('We got a ChatMessage packet!');
        console.log(data);
        console.log(data.message); // Let's take a closer look
    });

    // Listen for socket errors. You will need to handle these here.
    socket.on('error', error => {
        console.error('Socket error');
        console.error(error);
    });
}
