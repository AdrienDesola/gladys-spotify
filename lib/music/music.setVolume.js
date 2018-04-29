const shared = require("../shared");

module.exports = function setVolume(params) {
  return shared.player.SetVolume(params.volume)
}
