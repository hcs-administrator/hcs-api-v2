// REST FILES
const express = require('express')

//const router = express()
//const useMainRouter = require('../../__routes/open/main')

const axios = require('axios')

const { proxyList } = require('../../__functions/proxylist')

const getTest = async () => {

    let url = `${process.env.BASE_URL}/test`

    let config = {
        method: 'GET',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS]
    }

    return await axios(config)
    .then(resp => ({ "message" : resp.data.Message }))
    .catch(err => console.log(err))
};

const getToken = async ({ eid, password }) => {

    let url = `${process.env.BASE_URL}/token/generate`

    let config = {
        method: 'POST',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        data : {
            data : {
                eid : eid,
                password : password
            },
            time : '1w'
        }
    }

    return await axios(config)
    .then(resp => {
        return { "token" : resp.data }
    })
    .catch(err => console.log(err))

}

const getTokenWithTime = async ({ eid, password, time }) => {

    let url = `${process.env.BASE_URL}/token/generate`

    let config = {
        method: 'POST',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        data : {
            data : {
                eid : eid,
                password : password
            },
            time : time
        }
    }

    return await axios(config)
    .then(resp => {
        return { "token" : resp.data }
    })
    .catch(err => console.log(err))

}

module.exports = {
    root : {
        getTest,
        getToken,
        getTokenWithTime
    }
}