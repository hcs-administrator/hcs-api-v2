require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken');
const axios = require('axios')
const { verify } = require("../../__functions/verify")

const router = express()

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.post('/get-users', verify, async (req, res) => {

    if (Object.keys(res.locals).includes('sub')) {
        if (res.locals.sub.AppRole === "Super_Admin") {
            
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
        
                let data = resp.data.Data
        
                res.status(200).send(data)
        
            })
            
            return;  
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        // res.send = invalid token from middleware
        // Needs to return message to frontend for redirect
        
        console.log("Test....")
        return;
    }

})

router.post('/get-user/:eid', verify, async (req, res) => {

    if (Object.keys(res.locals).includes('sub')) {
        if (res.locals.sub.AppRole === "Teacher" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {
        
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
        
                let data = resp.data.Data.filter( d => d.emailaddress === `${req.params.eid.toLowerCase()}@hcs.kiwi` )
        
                res.status(200).send(data)
        
            })
            
            return;  
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        // res.send = invalid token from middleware
        // Needs to return message to frontend for redirect
        
        console.log("Test....")
        return;
    }

})

router.post('/add-user', verify, async (req, res) => {

    console.log(res.locals)

    if (Object.keys(res.locals).includes('sub')) {
        if (res.locals.sub.AppRole === "Teacher" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {
        
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

                console.log(resp.data)

                res.status(200).json({"MSG" : "User Created Successfully"})
                //res.send("Data...")
        
            })
            
            return;  
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        // res.send = invalid token from middleware
        // Needs to return message to frontend for redirect
        
        console.log("Test....")
        return;
    }

})

router.delete('/remove-user/:id', verify, async (req, res) => {

    console.log(res.locals)

    if (Object.keys(res.locals).includes('sub')) {
        if (res.locals.sub.AppRole === "Teacher" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {
        
            const url = "https://portal.disolutions.co.nz/api/"
            const params = {
                "token": process.env.VOIP_TOKEN,
                "action": "Delete-Voice-User",
                "context": "voice",
                "params" : {
                    "useruniqueid" : req.params.id
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

                console.log(resp.data)

                res.status(200).json({"MSG" : "User Removed Successfully"})
                //res.send("Data...")
        
            })
            
            return;  
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        // res.send = invalid token from middleware
        // Needs to return message to frontend for redirect
        
        console.log("Test....")
        return;
    }

})

router.post('/me', verify, async (req, res) => {

    if (Object.keys(res.locals).includes('sub')) {
        if (res.locals.sub.AppRole === "Teacher" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {
        
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
    
                let data = resp.data.Data.filter( d => d.emailaddress === `${res.locals.sub.EID.toLowerCase()}@hcs.kiwi` )
        
                res.status(200).send(data)
    
            })
            
            return;  
        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        // res.send = invalid token from middleware
        // Needs to return message to frontend for redirect
        
        console.log("Test....")
        return;
    }


})


module.exports = router