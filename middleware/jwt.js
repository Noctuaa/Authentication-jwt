'use strict';
const fs = require('fs');
const jwt =  require('jsonwebtoken');

class JsonWebToken {
    constructor() {
        this.privateKey = fs.readFileSync('./private.key', 'utf8');
        this.publicKey =  fs.readFileSync('./public.key', 'utf8');
        this.token = '';
    }

    /**
     * Generate a token with jwt.sign.
     * @param {Object} payload 
     */
    generate = (payload) => {
        const signOptions = {
            issuer : 'Mysoft corp',
            subject:  'some@user.com',
            audience:  'http://mysoftcorp.in',
            expiresIn:  "12h",
            algorithm:  "RS256"
        }
        this.token = jwt.sign(payload, this.privateKey, signOptions);
        return this.token;
    }

    /**
     * Verify if the token is good. 
     * @param {String} token 
     */
    verify = (token) => {
        const verifyOptions = {
            issuer : 'Mysoft corp',
            subject:  'some@user.com',
            audience:  'http://mysoftcorp.in',
            expiresIn:  "12h",
            algorithm:  ["RS256"]
        }

        const legit = jwt.verify(token, this.publicKey, verifyOptions);
        return legit;
    }
}

module.exports = new JsonWebToken;