const shared = require('../lib/shared.js');

module.exports = (req, res, next) => {
    shared
        .player
        .authorizationCodeGrant(req.query.code)
        .then(({body}) => {
            const {access_token, refresh_token} = body;

            shared.player.setAccessToken(access_token);
            shared.player.setRefreshToken(refresh_token);
            gladys.param.setValue({name: 'spotify_access_token', value: access_token});
            gladys.param.setValue({name: 'spotify_refresh_token', value: refresh_token});
            res.send('Token successful added');
        })
        .catch(res.send)
}