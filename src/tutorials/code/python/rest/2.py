import requests
import sys

s = requests.Session()
s.headers.update({'Client-ID': 'CLIENT_ID'})

channel_response = s.get('https://mixer.com/api/v1/channels/{}'.format(sys.argv[1]))

viewers = channel_response.json()['viewersTotal']
print("You have {} viewers...".format(viewers))
