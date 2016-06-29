def channels_with_more_viewers(viewers):
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
