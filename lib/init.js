const SpotifyWebApi = require("spotify-web-api-node");
const schedule = require('node-schedule');

const shared = require("./shared");

module.exports = function init() {
    shared.player = new SpotifyWebApi({
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        redirectUri: process.env.redirectUri
    });
    
    // Set the access token and refresh token
    gladys.param.getValue('spotify_access_token').then(token => token && shared.player.setAccessToken(token));
    gladys.param.getValue('spotify_refresh_token').then(token => token && shared.player.setRefreshToken(token));

    schedule.scheduleJob('* 30 * * * *', job => { // job made every 30 minutes
        shared.player.refreshAccessToken()
        .then(data => {        
            gladys.param.setValue({name: 'spotify_access_token', value: data.body.access_token})
            shared.player.setAccessToken(data.body.access_token)
        })
        .catch(error => console.error('Could not refresh the Spotify token!', error.message))
    });

    return new Promise(resolve => resolve(shared.player))
}