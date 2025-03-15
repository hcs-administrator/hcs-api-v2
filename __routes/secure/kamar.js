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

            const url = "https://directory-service.hcs.net.nz/data"
            const params = {
                // "token": process.env.VOIP_TOKEN,
                // "action": "Get-Voice-Users",
                // "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {

                const base = resp.data.SMSDirectoryData

                const usercode = res.locals.sub.EID.length < 8 ? res.locals.sub.EID.toUpperCase() : res.locals.sub.EID

                console.log(usercode)

                let user = base.staff.data.filter( d => d.username === usercode)[0]

                if (user === undefined) {
                    user = base.students.data.filter( d => d.username === req.body.id)[0] 

                    if (user === undefined) {
                        user = "No User Found"
                    }
                }

                console.log(user)
        
                res.status(200).send(user)
    
            })

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/get-user', verify, async (req, res) => {

    const id = req.body.id === undefined ? "" : req.body.id
    const fields = req.body.type === undefined ? [] : req.body.fields

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const url = "https://directory-service.hcs.net.nz/data"
            const params = {
                // "token": process.env.VOIP_TOKEN,
                // "action": "Get-Voice-Users",
                // "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {

                const base = resp.data.SMSDirectoryData

                const usercode = id.length < 8 ? id.toUpperCase() : id

                // console.log(usercode)

                let user = base.staff.data.filter( d => d.username === usercode)[0]

                if (user === undefined) {
                    user = base.students.data.filter( d => d.username === id)[0] 

                    if (user === undefined) {
                        user = "No User Found"
                    }
                }

                if (user !== "No User Found") {

                    console.log(fields, fields.length)

                    if (fields.length > 0) {

                        const filter = Object.keys(user)
                            .filter(key => fields.includes(key))
                            .reduce((obj, key) => {

                                console.log(key)
        
                                obj[key] = user[key];

                                console.log(obj)
        
                                return (obj)
        
                            }, {});

                        res.status(200).send(filter)

                    } else {

                        res.status(200).send(user)

                    }

                } else {
                    res.status(200).send(user)
                }

                //console.log(user)
        
            })

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/get-users', verify, async (req, res) => {

    const type = req.body.type === undefined ? "" : req.body.type
    const fields = req.body.type === undefined ? [] : req.body.fields

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const url = "https://directory-service.hcs.net.nz/data"
            const params = {
                // "token": process.env.VOIP_TOKEN,
                // "action": "Get-Voice-Users",
                // "context": "voice"
            }
        
            await axios({
                method: 'post',
                url,
                data: params,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(resp => {

                if (type !== "") {

                    const base = resp.data.SMSDirectoryData[type].data

                    if (fields.length > 0) {

                        const filter = base.map(b => Object.keys(b)
                            .filter(key => fields.includes(key))
                            .reduce((obj, key) => {
        
                                obj[key] = b[key];
    
                                return (obj)
        
                            }, {}));
    
                        res.status(200).send(filter)
    
                    } else {
    
                        res.status(200).send(base)
    
                    }

                } else {
                    res.status(200).send("No Users Found")
                }
        
            })

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

module.exports = router