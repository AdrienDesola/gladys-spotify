const shared = require("../shared");

module.exports = function getPlaying() {

  return shared.player.getMyCurrentPlaybackState()
    .then( ({ body }) => body.is_playing)
    
}