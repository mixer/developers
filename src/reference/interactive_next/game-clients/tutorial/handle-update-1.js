/* eslint-disable strict */
/* global mixer */
const titleElement = document.getElementById('title');
function handleControlUpdate (update) {
    const filteredControls = update.controls.filter(c => c.controlID === 'overlay');
    if (filteredControls.length !== 1) {
        return;
    }

    const overlayControl = filteredControls[0];
    titleElement.style.left = `${overlayControl.titlePosition.x * 100}%`;
    titleElement.style.top = `${overlayControl.titlePosition.y * 100}%`;
}

mixer.socket.on('onControlUpdate', handleControlUpdate);
