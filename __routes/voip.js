require('dotenv').config()
const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken');

const router = express()

const { verify } = require("../__functions/verify")

router.get('/', (req, res) => {

    //1: Get token
    const token = req.query.token

    //2: Check if valid
    const isValid = verify(token)

    //3: Show results
    console.log(isValid)

    if (req.query.token) {

        res.status(200).send("HCS VOIP")

    } else {

        res.status(401).send("NO HCS VOIP")

    }
})

module.exports = router