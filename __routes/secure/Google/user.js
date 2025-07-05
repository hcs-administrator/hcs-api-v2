require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');

const { verify, scopes } = require("../../../__functions/verify")
const { proxyList } = require('../../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_RETURN_URL
);

router.post('/me', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const url = oauth2Client.generateAuthUrl({
                access_type: "offline",
                scope: scopes
            });

            res.send(url)

        }
    }

})

//gmail-get-email-aliases

module.exports = router