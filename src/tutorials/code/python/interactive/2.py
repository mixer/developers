URL = "https://beam.pro/api/v1/"

AUTHENTICATION = {
    "username": "USERNAME",
    "password": "PASSWORD",
    "code": "2FA-CODE"  # Unnecessary if two-factor authentication is disabled.
}

SESSION = Session()


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
