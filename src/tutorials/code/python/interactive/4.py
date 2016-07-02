@asyncio.coroutine
def run():
    """Run the interactive app."""

    # Authenticate with Beam and retrieve the channel id from the response.
    channel_id = login(  # **AUTHENTICATION is a cleaner way of doing this.
        AUTHENTICATION["username"],
        AUTHENTICATION["password"],
        AUTHENTICATION["code"]
    )["channel"]["id"]

    # Get Interactive connection information.
    data = join_interactive(channel_id)

    # Initialize a connection with Beam Interactive.
    connection = yield from start(data["address"], channel_id, data["key"])

    # Handlers, to be called when Interacive packets are received.
    handlers = {
        proto.id.error: on_error,
        proto.id.report: on_report
    }

    # wait_message is a coroutine that will return True when it receives
    # a complete packet from Beam Interactive, or False if we got disconnected.
    while (yield from connection.wait_message()):

        # Decode the Interactive packet.
        decoded, _ = connection.get_packet()
        packet_id = proto.id.get_packet_id(decoded)

        # Handle the packet with the proper handler, if its type is known.
        if packet_id in handlers:
            handlers[packet_id](decoded)
        elif decoded is None:
            print("Unknown bytes were received. Uh oh!", packet_id)
        else:
            print("We got packet {} but didn't handle it!".format(packet_id))

    connection.close()


loop = asyncio.get_event_loop()

try:
    loop.run_until_complete(run())
finally:
    loop.close()
