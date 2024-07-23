const express = require('express')
const router = express()

router.get('/', (req, res) => {
    res.status(200).send("HCS API Server, please read the docs on /_light or /_dark")
})

router.all('/', (req, res) => {
    res.status(404).send("HCS API Server, please read the docs on /_light or /_dark")
})

module.exports = router