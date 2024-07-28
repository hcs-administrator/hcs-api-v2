require('dotenv').config()

const express = require('express')
const axios = require('axios')
const router = express()
const jwt = require('jsonwebtoken');

const { Base64 } = require('js-base64');
Base64.extendString();

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const { proxyList } = require('../__functions/proxylist')

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secasfljadlkfjkalsflret';
opts.issuer = 'Hamilton Christian School';
opts.audience = 'api.hcs.net.nz';

router.post('/generate', async (req, res) => {

    let body = req.body.data
    let expiresIn = req.body.time

    let path = "vw_igjbjp94y4sxsx"

    let data = {
        fields: "EID,Id", 
        where: `(EID,eq,${body.eid})~and(NetworkPassword,eq,${body.password})` 
    }

    let url = `${process.env.NOCO_URL}/api/v2/tables/md_mhduoowwpvkj7k/records?viewId=${path}&fields=${data.fields}&where=${data.where}&limit=1&shuffle=0&offset=0`

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

        //sub: resp.data.list[0], name: )

        if (Object.keys(req.body).length === 2) {

            const sub = JSON.stringify(resp.data.list[0]).toBase64()

            jwt.sign({ sub , name: { "issuer" : opts.issuer, "audience" : opts.audience  } }, process.env.JWT_SECRET.toBase64(true), { expiresIn }, (err, token) => {
                res.status(200).send(token)
            })

        } else {

            jwt.sign({ sub: "", name: "" }, process.env.JWT_SECRET.toBase64(true), { expiresIn: '1m' }, (err, token) => {
                res.status(405).send(token)
            })

        }

    })
    .catch(err => console.log(err))    
})

router.get('/verify', async (req, res) => {

    jwt.verify(req.query.token, process.env.JWT_SECRET.toBase64(), function(err, decoded) {

        if (err === null) {

            if (decoded.name.issuer === process.env.JWT_ISSUER && decoded.name.audience === process.env.JWT_AUDIENCE) {

                const sub = JSON.parse(decoded.sub.fromBase64(), true)

                res.status(200).send(sub)

            } else {

                res.status(404).send({"MSG" : "No User"})
            }

        } else if (err.message === "secret or public key must be provided") {

            res.status(401).send({"MSG" : "Error: Validation Issue"})

        } else {

            res.status(401).send({"MSG" : "Error: Auth or Issuer issue"})

        }

    });
})

module.exports = router