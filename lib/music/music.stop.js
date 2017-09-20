const shared = require("../shared");

module.exports = function stop() {
  return shared.player.pause()
}