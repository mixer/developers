"""Move the mouse based on Beam Interactive controls."""

import asyncio

from urllib.parse import urljoin

from math import isnan

from beam_interactive import start, proto
from requests import Session
from pymouse import PyMouse

URL = "https://beam.pro/api/v1/"

AUTHENTICATION = {
    "username": "USERNAME",
    "password": "PASSWORD",
    "code": "2FA-CODE"  # Unnecessary if two-factor authentication is disabled.
}

SESSION = Session()
MOUSE = PyMouse()


def _build(endpoint, *, url=URL):
    """Build an address for an API endpoint."""
    return urljoin(url, endpoint.lstrip('/'))


def login(username, password, code='', *, session=SESSION):
    """Log into Beam via the API."""
    auth = dict(username=username, password=password, code=code)
    return session.post(_build("/users/login"), data=auth).json()


def join_interactive(channel, *, session=SESSION):
    """Retrieve interactive connection information."""
    return session.get(_build("/tetris/{channel}/robot").format(
        channel=channel)).json()


def on_error(error):
    """Handle error packets."""
    print("Oh no, there was an error!", error.message)


def on_report(report):
    """Handle report packets."""

    # Tactile Mouse Click Control
    for tactile in report.tactile:
        if tactile.pressFrequency:
            print("Tactile report received!", tactile, sep='\n')
            MOUSE.click(*MOUSE.position())

    # Joystick Mouse Movement Control
    for joystick in report.joystick:
        if not isnan(joystick.coordMean.x) and not isnan(joystick.coordMean.y):
            print("Joystick report received!", joystick, sep='\n')
            mouse_x, mouse_y = MOUSE.position()

            MOUSE.move(
                round(joystick.coordMean.x*20) + mouse_x,
                round(joystick.coordMean.y*20) + mouse_y
            )


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

    # Initialize a connection with Interactive.
    connection = yield from start(data["address"], channel_id, data["key"])

    # Handlers, to be called when Interactive packets are received.
    handlers = {
        proto.id.error: on_error,
        proto.id.report: on_report
    }

    # wait_message is a coroutine that will return True when it receives
    # a complete packet from Interactive, or False if we got disconnected.
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


if __name__ == "__main__":
    loop = asyncio.get_event_loop()

    try:
        loop.run_until_complete(run())
    finally:
        loop.close()
