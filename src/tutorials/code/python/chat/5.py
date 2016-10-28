from chatty import create
import config

from tornado.ioloop import PeriodicCallback, IOLoop


if __name__ == "__main__":
    chat = create(config)

    # Tell chat to authenticate with the beam server. It'll throw
    # a chatty.errors.NotAuthenticatedError if it fails.
    chat.authenticate(config.CHANNEL)

    # Handle incoming messages.
    def on_message(message):
        print("RECEIVE:", message)
    
    # Listen for incoming messages. When they come in, just print them.
    chat.on("message", on_message)

    # Create a timer that sends the message "Hi!" every second.
    PeriodicCallback(
        lambda: chat.message('Hi!'),
        1000
    ).start()

    # Start the tornado event loop.
    IOLoop.instance().start()
