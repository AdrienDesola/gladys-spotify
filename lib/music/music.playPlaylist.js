const shared = require("../shared");

module.exports = function playPlaylist(context_uri) {
  return shared.player.play({ context_uri })
}