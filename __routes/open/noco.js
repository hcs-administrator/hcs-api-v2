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

router.get('/get-intranet-menu-items', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/md_9qnjk6h73pu7ky/records?viewId=vw_l2tp28vik123dx&sort=order`

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

router.get('/get-link-categories', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/m40fizzehnpxinh/records?viewId=vw3y1te6xuqmuye6&sort=order`

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

router.get('/get-links', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/mtyc0ze86h2uu1n/records?viewId=vw4vows4qoadkivk&sort=Id&shuffle=0`

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

router.get('/get-app-list', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/mtyc0ze86h2uu1n/records?viewId=vw4vows4qoadkivk&sort=order`

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

router.get('/get-app-list-code', async (req, res) => {

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/mtyc0ze86h2uu1n/records?viewId=vw4vows4qoadkivk&sort=order`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => {

        //.map(gr => gr.replace('-', ' '))

        const results = resp.data.list.filter(d => d.group.split(",").includes(req.query.dept))

        const html = `
            <div class="ac_container">
                ${results.map(result => {
                    return (`
                        <a class="ac_link" href="${result.AppLinkURL}" target="_blank">
                        <img src="${result.AppImageURL}" alt="${result.Alt}" class="ac_image">
                        <span class="ac_title" style="color:#222">${result.Title}</span>
                        </a>
                    `)
                }).join("")}
            </div>
        `

        res.send(html)
    })
    .catch(err => console.log(err))

})

module.exports = router

module.exports = router