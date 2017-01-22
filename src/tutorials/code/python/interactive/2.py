URL = "https://beam.pro/api/v1/"


headers = {'Authorization': 'Bearer AUTH_TOKEN'}

SESSION = Session()


def _build(endpoint, *, url=URL):
    """Build an address for an API endpoint."""
    return urljoin(url, endpoint.lstrip('/'))


def get_current(session=SESSION):
    """Log into Beam via the API."""
    return session.get(_build("/users/current"), headers=headers).json()


def join_interactive(channel, *, session=SESSION):
    """Retrieve interactive connection information."""
    return session.get(_build("/interactive/{channel}/robot", headers=headers).format(
        channel=channel)).json()
