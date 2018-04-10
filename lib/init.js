const SpotifyWebApi = require("spotify-web-api-node");
const schedule = require('node-schedule');
const util = require('util');
const shared = require("./shared");
var Promise = require('bluebird');

module.exports = function init() {

    return gladys
        .param
        .getValues(['spotify_client_id', 'spotify_client_secret', 'spotify_redirect_uri'])
        .then(values => {
            const clientId = values[0],
                clientSecret = values[1],
                redirectUri = values[2];

            shared.player = new SpotifyWebApi({clientId, clientSecret, redirectUri});
            return shared.player;
        })
        .then(player => {
            return gladys
                .param
                .getValue('spotify_refresh_token')
                .then(value => {
                    return shared.player.setRefreshToken(value)
                })
        })
        .then(() => {
            refreshAccessToken()
            shared.cron = schedule.scheduleJob('1 30 * * * *', refreshAccessToken)
        })
}

const refreshAccessToken = () => {

    return shared.player.refreshAccessToken()
        .then(({body}) => shared.player.setAccessToken(body.access_token))
        .then(() => shared.player.getMyDevices())
        .then(result => Promise.map(result.body.devices, device => {
            const param = {
                device: {
                    name: 'Spotify',
                    protocol: 'wifi',
                    service: 'spotify-connect',
                    identifier: device.name
                },
                types: [
                    {
                        type: 'music',
                        identifier: 'music',
                        sensor: false,
                        min: 0,
                        max: 0
                    }
                ]
            };
            return gladys.device.create(param);
        }))
        .then(log => console.info('The Spotify token was successful refresh!'))
        .catch(error => console.error('Could not refresh the Spotify token!', error.message));
}
