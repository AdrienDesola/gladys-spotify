const shared = require("../shared");

module.exports = function getVolume(parms) {

  return shared.player.getMyDevices()
    .then( ({ body }) => {
	var result = {volume : 0}
        const device = body.devices.find(device => device.is_active) || {}
	result.volume = device.volume_percent
        return result;
    })
}
