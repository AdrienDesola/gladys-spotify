const shared = require("../shared");
const transfert = require("./music.transfert");

module.exports = function playPlaylist(context_uri) {
	return shared.player.play({ context_uri })
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
