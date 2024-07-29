require('dotenv').config()

// const express = require('express')
// const axios = require('axios')
// const router = express()

const jwt = require('jsonwebtoken');

const { Base64 } = require('js-base64');
Base64.extendString();

const verify = (token) => {
    
    return jwt.verify(token, process.env.JWT_SECRET.toBase64(), function(err, decoded) {

        if (err === null) {

            if (decoded.name.issuer === process.env.JWT_ISSUER && decoded.name.audience === process.env.JWT_AUDIENCE) {

                const sub = JSON.parse(decoded.sub.fromBase64(), true)

                return {...sub, "Code" : 200}

            } else {

                return {"MSG" : "No User", "Code" : 401}
            }

        } else if (err.message === "secret or public key must be provided") {

            return {"MSG" : "Error: Validation Issue", "Code" : 401}

        } else {

            return {"MSG" : "Error: Auth or Issuer issue", "Code" : 401}

        }

    });

}

module.exports = { verify }