const request = require('request-promise-native');

class Spotify {
    constructor({clientId, clientSecret, redirectUri, access_token, refresh_token}) {

        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;

        this.accessToken = access_token;
        this.refreshToken = refresh_token;

        this.domain = 'https://api.spotify.com/';
    }

    get refreshToken() {
        return this.refresh_token
    }

    set refreshToken(token) {
        this.refresh_token = token
    }

    get accessToken(){
        return this.access_token;
    }

    set accessToken(token) {
        this.access_token = token
    }


    devices() {
        return this._request('GET', 'v1/me/player/devices')
    }
    play(device_id, context_uri) {
        return this._request('PUT', `v1/me/player/play?device_id=${device_id}`, {context_uri})
    }
    pause(device_id) {
        return this._request('PUT', `v1/me/player/pause?device_id=${device_id}`)
    }
    volume(device_id, volume) {
        return this._request('PUT', `v1/me/player/volume?volume_percent=${volume}&device_id=${device_id}`)
    }
    
    createAuthorizeURL(scopes) {
        return Promise.resolve(`https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}?${encodeURIComponent(scopes)}
            &redirect_uri=${encodeURIComponent(this.redirectUri)}`);
    }
    refreshAccessToken() {
        return request({
            method: 'POST',
            uri: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken
            },
            headers: {
                'Authorization': `Basic ${this.encode(this.clientId + ':' +this.clientSecret)}`
            },
            json: true
        })
        .then(res => {
            return this.accessToken = res.access_token;
        });
    }

    encode(data) {
        return new Buffer(data).toString('base64')
    }

    _request(method, path, body) {
        return request({
            method,
            uri: this.domain + path,
            body,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            json: true
        })
    }

    addMethod(name, method) {
        return this[name] = method
    }
}

module.exports = Spotify;

const client = new Spotify({ clientId: '9531e8d35afe4d308b5c99a9b551c87f', clientSecret: '53f0d77ce96c432eb74ffc7f698f0e35', refresh_token: 'AQAF11M40i1LRsfdbJQKbswbTMYOt-h1muNTM8aejoIxZWnyUEStpevqWVmNIEuHUAN1t7NF3nv8nEn5_aKxFtSwfCSj0srEPfkKw3eAuYpVwyCxyRrv6wewdE9X1nCqhd0' });
client.refreshAccessToken()
.then(() => {
    client.devices().then(data => console.log(data)).catch( ({message}) => console.error(message));
});