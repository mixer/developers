ca.subscribe(`channel:${channelId}:update`, data => {
    console.log(data);
});