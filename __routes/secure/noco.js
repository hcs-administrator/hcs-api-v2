require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');
const { verify } = require("../../__functions/verify")

const { proxyList } = require('../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.post('/me', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            console.log(req.body)

            let body = req.body.data
            //let expiresIn = req.body.time

            let selected_table = "md_mhduoowwpvkj7k"
            let selected_view = "vw_7rb0y6ojrhg66v" //Photos View

            let data = {
                where: `(EID,eq,${body.eid.toUpperCase()})` 
            }

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&where=${data.where}&limit=250&sort=order`

            return await axios({
                method: 'GET',
                url: url,
                proxy: proxyList[process.env.PROXY_PASS],
                headers: {
                    "xc-token" : process.env.NOCO_TOKEN
                }
            })
            .then(resp => {

                const result = resp.data.list

                res.send(result)

            })
            .catch(err => console.log(err))

        }
    }

})

router.post('/name-only', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            //let expiresIn = req.body.time

            let selected_table = "md_mhduoowwpvkj7k"
            let selected_view = "vw57102vne3kac5x" //Photos View

            let data = {
                fields: "EID,FirstName,LastName", 
                where: `(EID,eq,${body.eid.toUpperCase()})` 
            }

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&fields=${data.fields}&where=${data.where}&limit=250&sort=order`

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

        }
    }

})

router.post('/alarm-areas', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            //let expiresIn = req.body.time

            let selected_table = "m5kzni3jhm38oe5"
            //let selected_view = "vwts1db45q89qiti" //Photos View

            let data = {
                fields: "Block,Staff,nc_99dy___nc_m2m_iiq_ezk_7os", 
                // where: `(EID,eq,${body.eid})` 
            }

            //&where=${data.where}
            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?fields=${data.fields}&limit=250&sort=order`

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

        }
    }

})

module.exports = router