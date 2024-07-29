require('dotenv').config()
const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken');

const router = express()

router.get('/', (req, res) => {

    //1: Get token
    //2: Check if valid
    //3: Show results

    if (req.query.token) {

        res.status(200).send("HCS VOIP")

    } else {

        res.status(401).send("NO HCS VOIP")

    }
})

module.exports = router