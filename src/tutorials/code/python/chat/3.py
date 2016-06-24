chat = create(config)

# Tell chat to authenticate with the beam server. It'll throw
# a chatty.errors.NotAuthenticatedError if it fails.
chat.authenticate(config.CHANNEL)
