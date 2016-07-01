//...
chatConnectable.on(UserJoinEvent.class, event -> {
    chatConnectable.send(ChatSendMethod.of(
        String.format("Hi %s! I'm pingbot! Write !ping and I will pong back!",
        event.data.username)));
});
//...
