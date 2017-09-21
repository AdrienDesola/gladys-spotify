const SpotifyWebApi = require("spotify-web-api-node");
const schedule = require('node-schedule');

const shared = require("./shared");

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
                .getValues(['spotify_access_token', 'spotify_refresh_token'])
                .then(values => {
                    return Promise.all([
                        shared
                            .player
                            .setAccessToken(values[0]),
                        shared
                            .player
                            .setRefreshToken(values[1])
                    ])
                })
        })

    schedule.scheduleJob('* 30 * * * *', job => {
        // job made every 30 minutes
        shared
            .player
            .refreshAccessToken()
            .then(data => {
                gladys
                    .param
                    .setValue({name: 'spotify_access_token', value: data.body.access_token})
                shared
                    .player
                    .setAccessToken(data.body.access_token)
            })
            .catch(error => console.error('Could not refresh the Spotify token!', error.message))
    });
}