import requests
import sys

s = requests.Session()

def channels_with_more_viewers(viewers):
    """Returns the number of channels that have more than `viewers` viewers.
    """

    rank = 0
    page = 0
    while True:
        channels_response = s.get('https://mixer.com/api/v1/channels', params={
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


channel_response = s.get('https://mixer.com/api/v1/channels/{}'.format(sys.argv[1]))

viewers = channel_response.json()['viewersTotal']
print("You have {} viewers...".format(viewers))

rank = channels_with_more_viewers(viewers)
print("Your rank on Mixer is {}!".format(rank))

