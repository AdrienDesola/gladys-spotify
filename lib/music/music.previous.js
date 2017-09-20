const shared = require("../shared");

module.exports = function previous() {
  return shared.player.skipToPrevious()
}