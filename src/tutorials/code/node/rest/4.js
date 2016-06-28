// ...
const run = (page) => {
    return beam.request('GET', '/channels', {
        qs: {
            page,
            fields: 'viewersTotal',
            order: 'viewersTotal:DESC',
        },
    }).then(res => {
// ...
