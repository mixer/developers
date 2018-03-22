/* eslint-disable strict */
/* global mixer */
mixer.socket.call('giveInput', {
    controlID: 'my-control',
    event: 'my-custom-event',
    dataFieldOne: 1,
    someOtherObject: {
        full: 'of exciting data!',
    },
});
