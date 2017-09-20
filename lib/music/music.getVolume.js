const shared = require("../shared");

module.exports = function getVolume() {

  return shared.player.getMyDevices()
    .then( ({ body }) => {
        const device = body.devices.find(device => device.is_active) || {}
        return device.volume_percent || 0;
    })
}