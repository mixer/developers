var Client = require('beam-client-node');
var config = require('config')

/**
 * Creates a new Beam client, set up to use OAuth. For direct
 * inspection, the oauth provider can be found through the
 * client's getProvider method.
 *
 * @return {Client}
 */
export default function () {
    var client = new Client();

    client.setUrl('public', config.get('url.public'))
          .setUrl('api', config.get('url.api'))
          .use('oauth', config.get('oauth'));

    return client;
};
