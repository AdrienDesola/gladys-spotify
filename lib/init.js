const SpotifyWebApi = require("spotify-web-api-node");
const schedule = require('node-schedule');

const shared = require("./shared");

const player = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUri
});

module.exports = function init() {
    shared.player = player
    
    // Set the access token and refresh token
    gladys.param.getValue('spotify_access_token').then(token => token && player.setAccessToken(token));
    gladys.param.getValue('spotify_refresh_token').then(token => token && player.setRefreshToken(token));

    schedule.scheduleJob('* 30 * * * *', job => { // job made every 30 minutes
        player.refreshAccessToken()
        .then(data => {        
            gladys.param.setValue({name: 'spotify_access_token', value: data.body.access_token})
            player.setAccessToken(data.body.access_token)
        })
        .catch(error => console.error('Could not refresh the Spotify token!', error.message))
    });

    return new Promise(resolve => resolve(player))
}