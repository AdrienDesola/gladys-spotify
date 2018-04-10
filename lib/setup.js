const init = require('./init');
const shared = require('./shared');

module.exports = function setup() {

    const url = shared.player.createAuthorizeURL(shared.scopes, 'DEV')
      console.info( `**** \n Allow your Spotify Account by click on this url : \n\n ${url} \n\n ****`);
      gladys.message.send({id: null}, {text:  `Allow your Spotify Account by click on this url : ${url}`, receiver: 1});

      return init;
}
