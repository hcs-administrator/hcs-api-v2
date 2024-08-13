const express = require('express')
const router = express()

router.all('/', (req, res) => {
    res.status(404).json({"Error" : "HCS API Server, please read the docs on /_light or /_dark"})
})

module.exports = router