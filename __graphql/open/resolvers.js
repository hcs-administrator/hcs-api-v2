const axios = require('axios')
const { proxyList } = require('../../__functions/proxylist')

const getToken = async ({ eid, password }) => {

    // EXAMPLE COMMENTS ONLY
    // URL = the REST BASED URL
    let url = `${process.env.BASE_URL}/token/generate`

    // CONFIG = this data really matches a normal REST request. Basically a copy from POSTMAN
    let config = {
        method: 'POST',
        url: url,
        proxy: proxyList[process.env.PROXY_PASS],
        data : {
            data : {
                eid : eid,
                password : password
            },
            time : '1h'
        }
    }

    return await axios(config)
    .then(resp => {
        //Return from REST request, but with the property that requested.
        //This query is redundant to the REST request, however when it comes to multiple requests, this will help
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
    root1 : {
        getToken,
        getTokenWithTime
    }
}