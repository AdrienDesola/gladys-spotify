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
        .then( ({ body }) => {
		return shared.player.setAccessToken(body.access_token)
        })
	.then( () => {
		var devices = shared.player.getMyDevices()
		devices.then(function(result) {
                	console.log(util.inspect(result.body.devices, {showHidden: false, depth: null}))
			return Promise.map(result.body.devices, function(device){
				var param = {
					device: {
						name: 'Spotify',
						protocol: 'wifi',
						service: 'spotify-connect',
						identifier: '1234'
					},
					types: [
						{
							type:'music',
							identifier:'music',
							sensor: false,
							min:0,
							max:0
						}
					]
				};
				param.device.identifier = device.name;
				gladys.device.create(param);
			})
		})
	})
        .then(log => console.info('The Spotify token was successful refresh!'))
        .catch(error => console.error('Could not refresh the Spotify token!', error.message));
}
