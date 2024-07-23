require('dotenv').config()
const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken');

const router = express()

const secretKey = 'your-secret-key';

router.get('/', (req, res) => {

    if (secretKey) {
        res.status(200).send("HCS VOIP")
    } else {
        res.status(401).send("NO HCS VOIP")
    }
})

module.exports = router