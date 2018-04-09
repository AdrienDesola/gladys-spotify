const shared = require("../shared");

module.exports = function play(options=false) {
	var param = {};
	if(options.room){
			return transfert(options.deviceType.identifier)
			var devices = shared.player.getMyDevices()
				 devices.then(function(result) {
					return Promise.map(result.body.devices, function(device){
						if(device.name==options.deviceType.identifier){
							param.push({device_id:device.id});
						}
					})
				})
	}
  return shared.player.play(param)
}