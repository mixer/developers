import requests
import sys

s = requests.Session()

channel_response = s.get('https://mixer.com/api/v1/channels/{}'.format(sys.argv[1]))
