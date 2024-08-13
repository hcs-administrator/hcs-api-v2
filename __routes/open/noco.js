require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');

const { proxyList } = require('../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.get('/staff-photos', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/md_mhduoowwpvkj7k/records?viewId=vw_v3op34uzszmd79&limit=250`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => {
        res.send(resp.data.list)
    })
    .catch(err => console.log(err))

})

router.get('/get-departments', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/md_z4di17kxatk5cz/records?viewId=vw_as5ofe6abuv6x9`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => {
        res.send(resp.data.list)
    })
    .catch(err => console.log(err))

})

module.exports = router