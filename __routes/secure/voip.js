require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken');
const axios = require('axios')
const { verify } = require("../../__functions/verify")

const router = express()

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.post('/me', verify, async (req, res) => {

    console.log(req.statusCode)

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Get-Voice-Users",
                "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {
    
                let data = resp.data.Data.filter( d => d.emailaddress === `${res.locals.sub.EID.toLowerCase()}@hcs.kiwi` )[0]
        
                res.status(200).send(data)
    
            })

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/get-users', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {
            
            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Get-Voice-Users",
                "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {

                res.status(200).send(resp.data.Data)

            })
            
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/get-user/', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Get-Voice-Users",
                "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {
                let data = resp.data.Data.filter( d => d.emailaddress === `${req.body.eid.toLowerCase()}@hcs.kiwi` )
                res.status(200).send(data)
            })

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }
})

router.post('/add-user', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {
            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Add-Voice-User",
                "context": "voice",
                "params" : {
                    "name" : req.body.params.name,
                    "displayname" : req.body.params.name,
                    "password" : req.body.params.password,
                    "confirm" : req.body.params.password,
                    "emailaddress" : req.body.params.emailaddress,
                    "mobilenumber" : "",
                    "callgroup" : "",
                    "billinggroup" : "",
                    "extension" : req.body.params.extension,
                    "profile" : "Teachers",
                    "pinnumber" : "",
                    "callerid" : "",
                    "primarynumber" : "",
                    "cliselection" : "078540010",
                    "mailboxselection" : ""
                }
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {
                if (resp.data.Result == 1) {
                    return res.status(200).json({"message" : resp.data.Message})
                }
                else if (resp.data.Result == 0) {
                    return res.status(409).json({"message" : resp.data.Message})
                } 
            })
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.delete('/remove-user', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {
            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Delete-Voice-User",
                "context": "voice",
                "params" : {
                    "useruniqueid" : req.body.params.id
                }
            }
        
            await axios({
                method: 'delete',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {

                if (resp.data.Result == 1) {
                    return res.status(200).json({"message" : resp.data.Message})
                }
                else if (resp.data.Result == 0) {
                    return res.status(400).json({"message" : resp.data.Message})
                } 

            })
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

/*

//TEMPLATE

router.post('/get-user/:eid', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

*/

module.exports = router