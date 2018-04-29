const shared = require("../shared");

module.exports = function setMuted() {
  return shared.player.SetVolume(0)
}
