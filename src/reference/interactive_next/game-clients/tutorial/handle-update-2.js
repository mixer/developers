/* eslint-disable strict */
/* eslint-disable no-undef */
/* global mixer */
function handleSceneUpdate (update) {
    const filteredScenes = update.scenes.filter(c => c.sceneID === 'default');
    if (filteredScenes.length !== 1) {
        return;
    }

    const defaultScene = filteredScenes[0];
    handleControlUpdate(defaultScene);
}

mixer.socket.on('onSceneUpdate', handleSceneUpdate);
mixer.socket.on('onSceneCreate', handleSceneUpdate);
