const init = require('./init');
const shared = require('./shared');

module.exports = function setup() {
    var newDevice = {
        device: {
          name: `Spotify Connect`,
          protocol: `wifi`,
          service: `gladys-spotify`,
          identifier: `gladys-spotify`
        },
        types: [{
          name: 'Music',
          type: 'music',
          identifier: 'music',
          sensor: false,
          min: 0,
          max: 0
        }]
      };

      const url = shared.player.createAuthorizeURL(shared.scopes, 'DEV')
      console.info( `**** \n Allow your Spotify Account by click on this url : \n\n ${url} \n\n ****`);
      gladys.message.send({id: null}, {text:  `Allow your Spotify Account by click on this url : ${url}`, receiver: 1});

      return gladys.device.create(newDevice)
      .then(init);
}