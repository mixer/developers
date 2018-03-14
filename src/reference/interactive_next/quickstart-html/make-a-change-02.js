/* eslint-disable strict */
/* global mixer */
/* eslint-disable no-unused-vars */
function handleVideoResized (position) {
    const overlay = document.getElementById('overlay');
    const player = position.connectedPlayer;
    overlay.style.top = `${player.top}px`;
    overlay.style.left = `${player.left}px`;
    overlay.style.height = `${player.height}px`;
    overlay.style.width = `${player.width}px`;
}
/* eslint-disable eol-last */