const shared = require("../shared");

module.exports = function getMuted() {

  return shared.player.getMyDevices()
    .then( ({ body }) => {
        const device = body.devices.find(device => device.is_active)
        if(!device) return false
        return !device.volume_percent
    })
}