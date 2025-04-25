require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { verify } = require("../../__functions/verify")

const { proxyList } = require('../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const find_student_id = async (username) => {

    let selected_table = "m8i5sfweac8jxq2"
    let selected_view = "vw26j0yy72we8002" 

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&where=(Username,eq,${username})`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        },
        data: { username }
    })
    .then(resp => {

        const result = resp.data.list[0]

        console.log(result)

        return result.Id

    })
    .catch(err => console.log(err))

}

const find_staff_id = async (username) => {

    let selected_table = "md_mhduoowwpvkj7k"

    let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?where=(EID,eq,${username})`

    return await axios({
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        headers: {
            "xc-token" : process.env.NOCO_TOKEN
        },
        data: { username }
    })
    .then(resp => {

        const result = resp.data.list[0]

        return `${result.Id}`

    })
    .catch(err => console.log(err))

}

router.post('/me', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let selected_table = "md_mhduoowwpvkj7k"
            let selected_view = "vw_7rb0y6ojrhg66v" //Photos View

            let data = {
                where: `(EID,eq,${res.locals.sub.EID.toUpperCase()})` 
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

router.post('/me-student', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let selected_table = "m8i5sfweac8jxq2"
            let selected_view = "vws3jmzjzk0bl6vz" 

            let data = {
                where: `(Username,eq,${res.locals.sub.Username.toLowerCase()})` 
            }

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&where=${data.where}`

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

router.post('/get-user', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

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

router.post('/get-student', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            //let expiresIn = req.body.time

            let selected_table = "m8i5sfweac8jxq2"
            let selected_view = "vws3jmzjzk0bl6vz" //Photos View

            let data = {
                where: `(Username,eq,${body.Username.toLowerCase()})` 
            }

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&where=${data.where}`

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

router.post('/get-users', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let selected_table = "md_mhduoowwpvkj7k"
            let selected_view = "vw_7rb0y6ojrhg66v" //Photos View

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&limit=1000&sort=order`

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

router.post('/get-students', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let selected_table = "m8i5sfweac8jxq2"
            let selected_view = "vws3jmzjzk0bl6vz" //Photos View

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records?viewId=${selected_view}&limit=1500`

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

////////////  ADDING DATA //////////////////

router.post('/add-staff', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            console.log(body)
            //let expiresIn = req.body.time

            let selected_table = "md_mhduoowwpvkj7k"

            //&where=${data.where}
            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records`

            return await axios({
                method: 'POST',
                url: url,
                proxy: proxyList[process.env.PROXY_PASS],
                headers: {
                    "xc-token" : process.env.NOCO_TOKEN
                },
                data: { ...body }
            })
            .then(resp => res.send(resp.data))
            .catch(err => console.log(err))

        }
    }

})

router.post('/add-student', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body.data
            console.log(body)
            //let expiresIn = req.body.time

            let selected_table = "m8i5sfweac8jxq2"

            //&where=${data.where}
            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records`

            return await axios({
                method: 'POST',
                url: url,
                proxy: proxyList[process.env.PROXY_PASS],
                headers: {
                    "xc-token" : process.env.NOCO_TOKEN
                },
                data: { ...body }
            })
            .then(resp => res.send(resp.data))
            .catch(err => console.log(err))

        }
    }

})

////////////  UPDATE DATA //////////////////

router.patch('/update-staff', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body
            let body_parsed = typeof body.data === 'string' ? JSON.parse(body.data) : body.data

            let selected_table = "md_mhduoowwpvkj7k"

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records`

            const id = await find_staff_id(body.eid.toUpperCase())

            return await axios({
                method: 'PATCH',
                url: url,
                proxy: proxyList[process.env.PROXY_PASS],
                headers: {
                    "xc-token" : process.env.NOCO_TOKEN
                },
                data: { ...body_parsed, id }
            })
            .then(resp => res.send(resp.data))
            .catch(err => console.log(err))

        }
    }

})

router.patch('/update-student', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            let body = req.body
            let body_parsed = typeof body.data === 'string' ? JSON.parse(body.data) : body.data

            let selected_table = "m8i5sfweac8jxq2"

            let url = `${process.env.NOCO_URL}/${process.env.NOCO_URL_TABLE}/${selected_table}/records`

            const id = await find_student_id(body.Username.toLowerCase() || body.username.toLowerCase())

            return await axios({
                method: 'PATCH',
                url: url,
                proxy: proxyList[process.env.PROXY_PASS],
                headers: {
                    "xc-token" : process.env.NOCO_TOKEN
                },
                data: { Id: id, Username: req.body.Username, ...body_parsed }
            })
            .then(resp => res.send(resp.data))
            .catch(err => res.send(err))
        }
    }

})



module.exports = router