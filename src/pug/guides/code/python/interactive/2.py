path = "https://beam.pro/api/v1"
auth = {
    "username": "USERNAME",
    "password": "PASSWORD"
}

def login(session, username, password):
    """Log into the Beam servers via the API."""
    auth = dict(username=username, password=password)
    return session.post(path + "/users/login", auth).json()

def get_tetris(session, channel):
    """Retrieve interactive connection information."""
    return session.get(path + "/tetris/{id}/robot".format(id=channel)).json()
