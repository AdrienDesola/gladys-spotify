require('dotenv').config();

var setup = require('./lib/setup');
var init = require('./lib/init');
var shared = require('./lib/shared');
var music = require('./lib/music');
var spotifyController = require('./controller/spotify.get');

module.exports = function (sails) {
    
    gladys.on('ready', init)

    return {
        setup,
        init,
        music,
        routes: {
            after: {
                'GET /spotify': spotifyController
            }
        }
    };
};