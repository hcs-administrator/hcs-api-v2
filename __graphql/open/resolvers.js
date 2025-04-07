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

const getMe = async ({ token }) => {

    //KAMAR
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/kamar/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    //NOCO
    let config2 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }


    //PAPERCUT
    let config3 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    //VOIP
    let config4 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    return await axios(config)
    .then(resp => {

        return  axios(config2)
        .then(resp2 => {

            return axios(config3)
            .then(resp3 => {
    
                return axios(config4)
                .then(resp4 => {

                    console.log(resp2.data[0])

                    return { 
                        "kamar" : {
                            "id": resp.data.id,
                            "uuid": resp.data.uuid,
                            "role": resp.data.role,
                            "created": resp.data.created,
                            "uniqueid": resp.data.uniqueid,
                            "schoolindex": resp.data.schoolindex,
                            "username": resp.data.username,
                            "title": resp.data.title,
                            "firstname": resp.data.firstname,
                            "lastname": resp.data.lastname,
                            "name" : `${resp.data.firstname} ${resp.data.lastname}`,
                            "gender": resp.data.gender,
                            "datebirth": resp.data.datebirth,
                            "classification": resp.data.classification,
                            "position": resp.data.position,
                            "house": resp.data.house,
                            "startingdate": resp.data.startingdate,
                            "photocopierid": resp.data.photocopierid,
                            "email": resp.data.email,
                            "mobile": resp.data.mobile,
                            "extension": resp.data.extension,
                            "groups": resp.data.groups
                        },
                        "noco" : {
                            "id" : resp2.data[0].Id,
                            "name" : `${resp2.data[0].FirstName} ${resp2.data[0].LastName}`,
                            "firstname": resp2.data[0].FirstName,
                            "lastname": resp2.data[0].LastName,
                            "createdat": resp2.data[0].CreatedAt,
                            "updatedat": resp2.data[0].UpdatedAt,
                            "eid": resp2.data[0].EID,
                            "email": resp2.data[0].Email,
                            "approle": resp2.data[0].AppRole,
                            "devices1": resp2.data[0].Devices1,
                            "service_accounts": resp2.data[0]['Service Accounts'],
                            "issmt": resp2.data[0].isSMT,
                            "newthisyear": resp2.data[0].newThisYear,
                            "dept_order": resp2.data[0].Dept_Order,
                            "order": resp2.data[0].Order,
                            "role1": resp2.data[0].Role1,
                            "role2": resp2.data[0].Role2,
                            "networkpassword": resp2.data[0].NetworkPassword,
                            "macpassword": resp2.data[0].MacPassword,
                            "ipadcode": resp2.data[0].iPadCode,
                            "tumu_pin": resp2.data[0].TUMU_PIN,
                            "tumu_id": resp2.data[0].TUMU_ID,
                            "tecom_user_id": resp2.data[0].Tecom_User_ID,
                            "tecom_user_pin": resp2.data[0].Tecom_User_PIN,
                            "tecom_fob_id": resp2.data[0].Tecom_Fob_ID,
                            "tecom_fob_number": resp2.data[0].Tecom_Fob_Number,
                            "fobs": resp2.data[0].Fobs,
                            "phonelogin": resp2.data[0].PhoneLogin,
                            "phoneext": resp2.data[0].PhoneExt,
                            "admin_roles": resp2.data[0]['Admin-Roles'],
                            "mathletics": resp2.data[0].Mathletics,
                            "alarm_areas": resp2.data[0]['Admin-Areas'],
                            "readingeggs": resp2.data[0].Readingeggs,
                            "isactive": resp2.data[0].isActive,
                            "hasphoto": resp2.data[0].hasPhoto,
                            "year": resp2.data[0].Year,
                            "qualifications": resp2.data[0].Qualifications,
                            "admin_rights": resp2.data[0]['Admin-Rights'],
                            "department": resp2.data[0].Department,
                            "googleid": resp2.data[0].GoogleID
                        },
                        "papercut" : {
                            "name" : resp3.data[0],
                            "email" : resp3.data[1],
                            "balance" : resp3.data[2],
                            "department" : resp3.data[3],
                            "office" : resp3.data[4],
                            "internal" : resp3.data[5],
                            "total_page" : resp3.data[6],
                            "total_jobs" : resp3.data[7]
                        },
                        "voip" : {
                            "id" : resp4.data.id,
                            "accountcode" : resp4.data.accountcode,
                            "name" : resp4.data.name,
                            "displayname" : resp4.data.displayname,
                            "secret" : resp4.data.secret,
                            "emailaddress" : resp4.data.emailaddress,
                            "mobilenumber" : resp4.data.mobilenumber,
                            "callgroup" : resp4.data.callgroup,
                            "billinggroup" : resp4.data.billinggroup,
                            "extension" : resp4.data.extension,
                            "profile" : resp4.data.profile,
                            "pinnumber" : resp4.data.pinnumber,
                            "callerid" : resp4.data.callerid,
                            "primarynumber" : resp4.data.primarynumber,
                            "useruniqueid" : resp4.data.useruniqueid,
                            "role" : resp4.data.role
                        }
                    }
                })
            })
        })
    })
    .catch(err => console.log(err))
}

const getVoipMe = async ({ token }) => {
    //VOIP
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    return axios(config)
    .then(resp => {
        return {
            "id" : resp.data.id,
            "accountcode" : resp.data.accountcode,
            "name" : resp.data.name,
            "displayname" : resp.data.displayname,
            "secret" : resp.data.secret,
            "emailaddress" : resp.data.emailaddress,
            "mobilenumber" : resp.data.mobilenumber,
            "callgroup" : resp.data.callgroup,
            "billinggroup" : resp.data.billinggroup,
            "extension" : resp.data.extension,
            "profile" : resp.data.profile,
            "pinnumber" : resp.data.pinnumber,
            "callerid" : resp.data.callerid,
            "primarynumber" : resp.data.primarynumber,
            "useruniqueid" : resp.data.useruniqueid,
            "role" : resp.data.role
        }
    })
}

const getVoipUser = async ({ token, user }) => {
    //VOIP
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    return axios(config)
    .then(resp => {
        return {
            "id" : resp.data.id,
            "accountcode" : resp.data.accountcode,
            "name" : resp.data.name,
            "displayname" : resp.data.displayname,
            "secret" : resp.data.secret,
            "emailaddress" : resp.data.emailaddress,
            "mobilenumber" : resp.data.mobilenumber,
            "callgroup" : resp.data.callgroup,
            "billinggroup" : resp.data.billinggroup,
            "extension" : resp.data.extension,
            "profile" : resp.data.profile,
            "pinnumber" : resp.data.pinnumber,
            "callerid" : resp.data.callerid,
            "primarynumber" : resp.data.primarynumber,
            "useruniqueid" : resp.data.useruniqueid,
            "role" : resp.data.role
        }
    })
}

const getVoipUsers = async ({ token, user }) => {
    //VOIP
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/get-users`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return axios(config)
    .then(resp => {

        return resp.data.map(user => {
            return {
                "id" : user.id,
                "accountcode" : user.accountcode,
                "name" : user.name,
                "displayname" : user.displayname,
                "secret" : user.secret,
                "emailaddress" : user.emailaddress,
                "mobilenumber" : user.mobilenumber,
                "callgroup" : user.callgroup,
                "billinggroup" : user.billinggroup,
                "extension" : user.extension,
                "profile" : user.profile,
                "pinnumber" : user.pinnumber,
                "callerid" : user.callerid,
                "primarynumber" : user.primarynumber,
                "useruniqueid" : user.useruniqueid,
                "role" : user.role
            }
        })
    })
}

const getPapercutMe = async ({ token }) => {
    //PAPERCUT
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token }
    }

    return await axios(config)
    .then(resp => {
        return {
            "name" : resp.data[0],
            "email" : resp.data[1],
            "balance" : resp.data[2],
            "department" : resp.data[3],
            "office" : resp.data[4],
            "internal" : resp.data[5],
            "total_page" : resp.data[6],
            "total_jobs" : resp.data[7]
        }
    })
}

const getPapercutUser = async ({ token, user }) => {
    //PAPERCUT
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, user }
    }

    return await axios(config)
    .then(resp => {
        return {
            "name" : resp.data[0],
            "email" : resp.data[1],
            "balance" : resp.data[2],
            "department" : resp.data[3],
            "office" : resp.data[4],
            "internal" : resp.data[5],
            "total_page" : resp.data[6],
            "total_jobs" : resp.data[7]
        }
    })
}

const getPapercutUsers = async ({ token }) => {
    //PAPERCUT
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/get-users`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return await axios(config).then(resp => resp.data)
}

const getKamarUser = async ({ token, user }) => {

    //KAMAR
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/kamar/get-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token : token, id: user }
    }

    return await axios(config)
    .then(resp => {
        return { 
            "id": resp.data.id,
            "uuid": resp.data.uuid,
            "role": resp.data.role,
            "created": resp.data.created,
            "uniqueid": resp.data.uniqueid,
            "schoolindex": resp.data.schoolindex,
            "username": resp.data.username,
            "title": resp.data.title,
            "firstname": resp.data.firstname,
            "lastname": resp.data.lastname,
            "name" : `${resp.data.firstname} ${resp.data.lastname}`,
            "gender": resp.data.gender,
            "datebirth": resp.data.datebirth,
            "classification": resp.data.classification,
            "position": resp.data.position,
            "house": resp.data.house,
            "startingdate": resp.data.startingdate,
            "photocopierid": resp.data.photocopierid,
            "email": resp.data.email,
            "mobile": resp.data.mobile,
            "extension": resp.data.extension,
            "groups": resp.data.groups
         }
    })
    .catch(err => console.log(err))

}

module.exports = {
    root : {
        getTest,
        getToken,
        getTokenWithTime,
        getMe,
        getKamarUser,
        getVoipMe,
        getVoipUser,
        getVoipUsers,
        getPapercutMe,
        getPapercutUser,
        getPapercutUsers
    }
}