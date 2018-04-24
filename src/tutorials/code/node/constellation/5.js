const Carina = require('carina').Carina;
const ws = require('ws');

Carina.WebSocket = ws;

const channelId = 1234;

const ca = new Carina({
    clientId: 'CLIENT_ID',
    isBot: true,
}).open();

ca.subscribe(`channel:${channelId}:update`, data => {
    console.log(data);
});
