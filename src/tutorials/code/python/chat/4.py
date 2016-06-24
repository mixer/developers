# Listen for incoming messages. When they come in, just print them.
chat.on("message", partial(print, "RECEIVE:"))

# Create a timer that sends the message "Hi!" every second.
PeriodicCallback(
    lambda: chat.message('Hi!'),
    1000
).start()

# Start the tornado event loop.
IOLoop.instance().start()