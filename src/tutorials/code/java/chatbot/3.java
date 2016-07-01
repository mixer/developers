if (chatConnectable.connect()) {
    chatConnectable.send(AuthenticateMessage.from(user.channel, user, chat.authkey), new ReplyHandler<AuthenticationReply>() {
        public void onSuccess(AuthenticationReply reply) {
            chatConnectable.send(ChatSendMethod.of("Hello World!"));
        }
        public void onFailure(Throwable var1) {
            var1.printStackTrace();
        }
    });
}
