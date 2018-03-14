/* eslint-disable strict */
/* eslint-disable no-use-before-define */
/* global mixer */
window.addEventListener('load', function initMixer () {
    mixer.display.position().subscribe(handleVideoResized);

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

function handleVideoResized (position) {
    const overlay = document.getElementById('overlay');
    const player = position.connectedPlayer;
    overlay.style.top = `${player.top}px`;
    overlay.style.left = `${player.left}px`;
    overlay.style.height = `${player.height}px`;
    overlay.style.width = `${player.width}px`;
}
/* eslint-disable eol-last */