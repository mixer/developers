/* eslint-disable strict */
/* global mixer */
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', function handleOverlayClicked (event) {
    mixer.socket.call('giveInput', {
        controlID: 'overlay',
        event: 'click',
        position: {
            x: event.offsetX / overlay.offsetWidth,
            y: event.offsetY / overlay.offsetHeight,
        },
    });
});
