require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');
const { verify } = require("../../__functions/verify")

const { proxyList } = require('../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

router.post('/name-only', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            let expiresIn = req.body.time

            let selected_table = "md_mhduoowwpvkj7k"
            let selected_view = "vw57102vne3kac5x" //Photos View

            let data = {
                fields: "EID,FirstName,LastName", 
                where: `(EID,eq,${body.eid})` 
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

router.get('/staff-photos', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let selected_table = "md_9qnjk6h73pu7ky"
            let selected_view = "vw_v3op34uzszmd79" //Photos View

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&limit=250&sort=order`

            //?limit=250&sort=order&fields=EID,FirstName,LastName,Email,Role1,Role2,Department,hasPhoto,Year,isSMT,order

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

// router.get('/get-departments', async (req, res) => {

//     let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/md_z4di17kxatk5cz/records?viewId=vw_as5ofe6abuv6x9`

//     return await axios({
//         method: 'GET',
//         url: url,
//         proxy: proxyList[process.env.PROXY_PASS],
//         headers: {
//             "xc-token" : process.env.NOCO_TOKEN
//         }
//     })
//     .then(resp => {
//         res.send(resp.data.list)
//     })
//     .catch(err => console.log(err))

// })

module.exports = router