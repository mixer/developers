/* eslint-disable strict */
/* global mixer */
this.client.state.getControl('overlay').on('click', (clickEvent) => {
    this.client.updateControls({
        sceneID: 'default',
        controls: [
            {
                controlID: 'overlay',
                titlePosition: clickEvent.input.position,
            },
        ],
    });
});
