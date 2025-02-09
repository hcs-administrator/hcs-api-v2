require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');

const { proxyList } = require('../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.get('/staff-photos', async (req, res) => {

    let selected_table = "md_mhduoowwpvkj7k"
    let selected_view = "vw_v3op34uzszmd79" //Photos View

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&limit=250&sort=order`

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

    let selected_table = "md_z4di17kxatk5cz"
    let selected_view = "vw_as5ofe6abuv6x9" //Photos View

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => res.send(resp.data.list))
    .catch(err => console.log(err))

})

router.get('/get-intranet-menu-items', async (req, res) => {

    let selected_table = "md_9qnjk6h73pu7ky"
    let selected_view = "vw_l2tp28vik123dx" //Admin Menu Items View

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&sort=order`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => res.send(resp.data.list))
    .catch(err => console.log(err))

})

router.get('/get-link-categories', async (req, res) => {

    let selected_table = "m40fizzehnpxinh"
    let selected_view = "vw3y1te6xuqmuye6" //Admin Menu Items View

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&sort=order`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => res.send(resp.data.list))
    .catch(err => console.log(err))

})

router.get('/get-links', async (req, res) => {

    let selected_table = "mbug3paysjldyaz"
    let selected_view = "vw2mjn3z02v2tqn5" //Admin Menu Items View

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&sort=Id&shuffle=0`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => res.send(resp.data.list))
    .catch(err => console.log(err))

})

router.get('/get-app-list', async (req, res) => {

    let selected_table = "mtyc0ze86h2uu1n"
    let selected_view = "vw4vows4qoadkivk" //iPad Apps

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&sort=order`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => res.send(resp.data.list))
    .catch(err => console.log(err))

})

router.get('/get-app-list-code', async (req, res) => {

    let selected_table = "mtyc0ze86h2uu1n"
    let selected_view = "vw4vows4qoadkivk" //iPad Apps

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&sort=order`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        }
    })
    .then(resp => {

        console.log(req.query.dept)

        if(req.query.dept === undefined || req.query.dept === null) {

            res.send("<h1>NO Department Queried</h1>")
            
        } else {
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
        }

    })
    .catch(err => console.log(err))

})

module.exports = router