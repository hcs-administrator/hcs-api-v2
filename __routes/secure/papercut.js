require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken');
const axios = require('axios')
const { verify } = require("../../__functions/verify")
const { 
    load_pc_users, 
    load_pc_details, 
    add_user, 
    remove_user, 
    set_user_balance,
    set_property 
} = require("../../__functions/papercut_functions")

const router = express()

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.post('/me', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const load_props = await load_pc_details(res.locals.sub.EID.toLowerCase())
            res.send(load_props)

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

            const load_users = await load_pc_users()
            res.send(load_users)

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

            const load_props = await load_pc_details(req.body.eid.toLowerCase())
            res.send(load_props)

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/add-user/', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {

            await add_user(
                req.body.username.toLowerCase(),
                req.body.password,
                req.body.fullname,
                req.body.email.toLowerCase(),
                req.body.card,
                req.body.pin,
            )

            res.send("User Added")

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.delete('/remove-user/', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {

            await remove_user(req.body.eid.toLowerCase())
            res.send("USER REMOVED")

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/set-user-balance/', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {

            await set_user_balance(req.body.username.toLowerCase(), req.body.amount, req.body.comment)
            res.send(`Balance for ${req.body.username.toLowerCase()} set to ${req.body.amount}`)

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

router.post('/set-property', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "Super_Admin") {

            const convert = await set_property(req.body.username.toLowerCase(), req.body.prop, req.body.val)

            //console.log(convert.methodResponse)

            res.send(`Balance for ${req.body.username.toLowerCase()} is updated`)

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

/*

router.post('/me', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            //

        } else {
            res.status(400).json({"Error" : "Wrong User Type"})
        }
    } else {
        res.status(401).json({"Error" : "Unauthorized User"})
    }

})

*/

module.exports = router