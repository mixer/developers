//...
chatConnectable.on(IncomingMessageEvent.class, event -> {
    if (event.data.message.message.get(0).text.startsWith("!ping")) {
        chatConnectable.send(ChatSendMethod.of(String.format("@%s PONG!",event.data.userName)));
    }
});
//...
