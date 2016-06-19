import asyncio
import pyautogui
import math
from requests import Session
from beam_interactive import start
from beam_interactive import proto
from random import random

path = "https://beam.pro/api/v1"
auth = {
    "username": "connor",
    "password": "password"
}


def login(session, username, password):
    """Log into the Beam servers via the API."""
    auth = dict(username=username, password=password)
    return session.post(path + "/users/login", auth).json()

def get_tetris(session, channel):
    """Retrieve interactive connection information."""
    return session.get(path + "/tetris/{id}/robot".format(id=channel)).json()

def on_error(error, conn):
    """This is called when we get an Error packet. It contains
    a single attribute, 'message'.
    """
    print('Oh no, there was an error!')
    print(error.message)


def on_report(report, conn):
    # Reports from beam will end up here
    currentMouseX, currentMouseY = pyautogui.position()
    x = report.joystick[0].coordMean.x;
    y = report.joystick[0].coordMean.y;
    if not math.isnan(x) and not math.isnan(y):
        pyautogui.moveTo(x + 300 * x, y + 300 * y)

loop = asyncio.get_event_loop()

@asyncio.coroutine
def connect():
    # Initialize session, authenticate to Beam servers, and retrieve Tetris
    # address and key.
    session = Session()
    # When we login we can retrieve the channel id from the response.
    channel_id = login(session, **auth)['channel']['id']

    data = get_tetris(session, channel_id)

    # start() takes the remote address of Beam Interactive, the channel
    # ID, and channel the auth key. This information can be obtained
    # via the backend API, which is documented at:
    # https://developer.beam.pro/api/v1/
    conn = yield from start(data['address'], channel_id, data['key'], loop)

    # Here we define some handlers which we will write in the next step
    handlers = {
        proto.id.error: on_error,
        proto.id.report: on_report
    }

    # wait_message is a coroutine that will return True when we get
    # a complete message from Beam Interactive, or False if we
    # got disconnected.
    while (yield from conn.wait_message()):
        # These two lines decode the packet from beam
        # into something more useable
        decoded, packet_bytes = conn.get_packet()
        packet_id = proto.id.get_packet_id(decoded)

        if decoded is None:
            print('We got a bunch of unknown bytes.')
            print(packet_id)
        elif packet_id in handlers:
            # Based on the packet id we can then
            # send it to the correct handler
            handlers[packet_id](decoded, conn)
        else:
            print("We got packet {} but didn't handle it!".format(packet_id))

    conn.close()

loop.run_until_complete(connect())