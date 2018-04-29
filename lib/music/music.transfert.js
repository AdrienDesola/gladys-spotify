const shared = require("../shared");
var Promise = require('bluebird');

module.exports = function transfert(deviceName) {
	var devices = shared.player.getMyDevices()
		devices.then(function(result) {
			return Promise.map(result.body.devices, function(device){
				if(device.name==deviceName){
					return shared.player.transferMyPlayback({
      					deviceIds: [device.id],
      					play: true
    				})
                }else{
					return Promise.resolve(true);
				}
			})
		})
}
