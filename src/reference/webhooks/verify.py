import hmac

# Using Flask-style requests, you may need to adjust it :)
def is_request_valid(request, body: str, secret: str):
    hm = hmac.new(bytes(secret, 'utf-8'), digestmod='SHA384')
    hm.update(bytes(body, 'utf-8'))
    expected = 'sha384=' + hm.hexdigest().upper())
    return hmac.compare_digest(request.headers['poker-signature'], expected)
