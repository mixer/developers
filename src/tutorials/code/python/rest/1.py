import requests
import sys

s = requests.Session()

def channels_with_more_viewers(viewers):
    """Returns the number of channels that have more than `viewers` viewers.
    """

    rank = 0
    page = 0
    while True:
        channels_response = s.get('https://beam.pro/api/v1/channels', params={
            'fields': 'viewersTotal',
            'order': 'viewersTotal:DESC',
            'page': page
        })

        for channel in channels_response.json():
            if channel['viewersTotal'] <= viewers:
                return rank
            else:
                rank += 1

        print("Your rank is at least {}...".format(rank))
        page += 1


login_response = s.post('https://beam.pro/api/v1/users/login', data={
    'username': sys.argv[1],
    'password': sys.argv[2]
})

viewers = login_response.json()['channel']['viewersTotal']

print("You have {} viewers...".format(viewers))

rank = channels_with_more_viewers(viewers)
print("Your rank on Beam is {}!".format(rank))

