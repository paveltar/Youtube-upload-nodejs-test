'use strict'

const { google } = require('googleapis')
// const http = require('http')
// const url = require('url')
// const opn = require('opn')
// const destroyer = require('server-destroy')
const fs = require('fs')
const path = require('path')

// const keyPath = path.join(__dirname, 'oauth2.keys.json')

const tokenPath = path.join(__dirname, 'token.json')

// if (fs.existsSync(keyPath)) {
//     const keyFile = require(keyPath)
//     keys = keyFile.installed || keyFile.web
// }

class Client {
    // constructor(options) {
    constructor() {
        // this._options = options || { scopes: [] }
        // const redirectUri = keys.redirect_uris[keys.redirect_uris.length - 1]

        // create an oAuth client to authorize the API call
        this.oAuth2Client = new google.auth.OAuth2(
            // keys.client_id,
            // keys.client_secret,
            // redirectUri
        )
    }

    // Open an http server to accept the oauth callback. In this
    // simple example, the only request to our webserver is to
    // /oauth2callback?code=<code>
    async authenticate() {
        return new Promise((resolve, reject) => {
            try {
                // const {tokens} = await this.oAuth2Client.getToken(qs.get('code'))
                if (fs.existsSync(tokenPath)) {
                    const tokenFile = require(tokenPath)
                    this.oAuth2Client.credentials = tokenFile
                    resolve(this.oAuth2Client)
                } else {
                    reject('no token file')
                }
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = new Client()
