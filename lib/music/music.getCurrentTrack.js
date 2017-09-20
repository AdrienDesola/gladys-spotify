const shared = require("../shared");

module.exports = function getCurrentTrack() {

  return shared.player.getMyCurrentPlayingTrack()
    .then( ({ body }) => ({
        title: body.item.name,
        artist: body.item.artists.map(artist => artist.name).join(' & '),
        album: body.item.album.name
    }) )
}
