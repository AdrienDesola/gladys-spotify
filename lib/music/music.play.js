const shared = require("../shared");
const transfert = require("./music.transfert");

module.exports = function play(options=false) {
	return shared.player.play(options)
		.catch(function(error) {
			return shared.player.pause(options)
		})
  		.then(() => {
	  		if(options.room){
				return transfert(options.deviceType.identifier)
			}else{
				return Promise.resolve(true)
			}
		})

}

