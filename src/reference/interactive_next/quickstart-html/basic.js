/* eslint-disable strict */
/* global mixer */
window.addEventListener('load', function initMixer () {
    // Every second, move the video around! Note: this won't work on
    // mobile, you can't move the video around there.
    mixer.display.moveVideo({
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    });

    // Whenever someone clicks on "Hello World", we'll send an event
    // to the game client on the control ID "title"
    document.getElementById('title').onclick = function () {
        mixer.socket.call('giveInput', {
            controlID: 'title',
            event: 'click',
        });
    };

    mixer.isLoaded();
});
/* eslint-disable eol-last */