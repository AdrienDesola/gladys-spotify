const shared = require("../shared");

module.exports = function getPlaylists() {

    return shared.player.getUserPlaylists()
        .then(({body}) => {
            return body.items.map(playlist => ({
                name: playlist.name,
                uri: playlist.uri
            }))
        })
}
