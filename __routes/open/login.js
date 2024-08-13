require('dotenv').config()

const express = require('express')
const axios = require('axios')
const router = express()
const jwt = require('jsonwebtoken');

const { Base64 } = require('js-base64');
Base64.extendString();

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const { proxyList } = require('../../__functions/proxylist')

//const { verify } = require("../../__functions/verify")
// const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;

router.post('/generate', async (req, res) => {

    let body = req.body.data
    let expiresIn = req.body.time

    let path = "vw_igjbjp94y4sxsx"

    let data = {
        fields: "EID,Id,AppRole", 
        where: `(EID,eq,${body.eid})~and(NetworkPassword,eq,${body.password})` 
    }

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/md_mhduoowwpvkj7k/records?viewId=${path}&fields=${data.fields}&where=${data.where}&limit=1&shuffle=0&offset=0`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => {

        if (Object.keys(req.body).length === 2) {

            jwt.sign({ sub: resp.data.list[0] , name: { "issuer" : opts.issuer, "audience" : opts.audience  } }, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
                res.status(200).send(token)
            })

        } else {

            jwt.sign({ sub: "", name: "" }, process.env.JWT_SECRET, { expiresIn: '1m' }, (err, token) => {
                res.status(405).send(token)
            })

        }

    })
    .catch(err => console.log(err))    
})

module.exports = router