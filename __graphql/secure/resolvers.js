// REST FILES
const express = require('express')

//const router = express()
//const useMainRouter = require('../../__routes/open/main')

const axios = require('axios')

const { proxyList } = require('../../__functions/proxylist')

const getMe = async ({ token }) => {

    //KAMAR
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/kamar/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    //NOCO
    let config2 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }


    //PAPERCUT
    let config3 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    //VOIP
    let config4 = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return await axios(config)
    .then(resp => {

        return  axios(config2)
        .then(resp2 => {

            return axios(config3)
            .then(resp3 => {
    
                return axios(config4)
                .then(resp4 => {

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

const getMe2 = async ({ token }) => {

        //MARK : WORK IN PROGRESS FOR OPTIMIZATIONS

        //KAMAR
        let config = {
            method: 'POST',
            url: `${process.env.BASE_URL}/kamar/me`,
            proxy: proxyList[process.env.PROXY_PASS],
            data : { token }
        }

        let result1 = await axios(config)
    
        //NOCO
        let config2 = {
            method: 'POST',
            url: `${process.env.BASE_URL}/noco/me`,
            proxy: proxyList[process.env.PROXY_PASS],
            data : { token }
        }

        let result2 = await axios(config2)
    
    
        //PAPERCUT
        let config3 = {
            method: 'POST',
            url: `${process.env.BASE_URL}/pc/me`,
            proxy: proxyList[process.env.PROXY_PASS],
            data : { token }
        }

        let result3 = await axios(config3)

        //VOIP
        let config4 = {
            method: 'POST',
            url: `${process.env.BASE_URL}/voip/me`,
            proxy: proxyList[process.env.PROXY_PASS],
            data : { token }
        }

        let result4 = await axios(config4)

        // console.log(result1.data)
        console.log(result2.data[0])
        // console.log(result3.data)
        // console.log(result4.data)

        return {
            "id": result1.data.id,
            "uuid": result1.data.uuid,
            "role": result1.data.role,
            "created": result1.data.created,
            "uniqueid": result1.data.uniqueid,
            "schoolindex": result1.data.schoolindex,
            "title": result1.data.title,
            "firstname": result1.data.firstname,
            "lastname": result1.data.lastname,
            "name" : `${result1.data.firstname} ${result1.data.lastname}`,
            "gender": result1.data.gender,
            "datebirth": result1.data.datebirth,
            "classification": result1.data.classification,
            "position": result1.data.position,
            "house": result1.data.house,
            "startingdate": result1.data.startingdate,
            "email": result1.data.email,
            "mobile": result1.data.mobile,
            "groups": result1.data.groups,
            "noco": {
                "id" : result2.data[0].Id,
                "name" : `${result2.data[0].FirstName} ${result2.data[0].LastName}`,
                "firstname": result2.data[0].FirstName,
                "lastname": result2.data[0].LastName,
                "createdat": result2.data[0].CreatedAt,
                "updatedat": result2.data[0].UpdatedAt,
                "eid": result2.data[0].EID,
                "email": result2.data[0].Email,
                "approle": result2.data[0].AppRole,
                "issmt": result2.data[0].isSMT,
                "newthisyear": result2.data[0].newThisYear,
                "department": result2.data[0].Department,
                "dept_order": result2.data[0].Dept_Order,
                "order": result2.data[0].Order,
                "role1": result2.data[0].Role1,
                "role2": result2.data[0].Role2,
                "networkpassword": result2.data[0].NetworkPassword,
                "devices1": result2.data[0].Devices1,
                "ipadcode": result2.data[0].iPadCode,
                "macpassword": result2.data[0].MacPassword,
                "tumu_pin": result2.data[0].TUMU_PIN,
                "tumu_id": result2.data[0].TUMU_ID,
                "tecom_user_id": result2.data[0].Tecom_User_ID,
                "tecom_user_pin": result2.data[0].Tecom_User_PIN,
                "tecom_fob_id": result2.data[0].Tecom_Fob_ID,
                "tecom_fob_number": result2.data[0].Tecom_Fob_Number,
                "fobs": result2.data[0].Fobs,
                "alarm_areas": result2.data[0]['Admin-Areas'],
                "admin_roles": result2.data[0]['Admin-Roles'],
                "isactive": result2.data[0].isActive,
                "hasphoto": result2.data[0].hasPhoto,
                "year": result2.data[0].Year,
                "qualifications": result2.data[0].Qualifications,
                "admin_rights": result2.data[0]['Admin-Rights'],
                "googleid": result2.data[0].GoogleID
            },
            "printing" : {
                "name" : result3.data[0], 
                "email" : result3.data[1], 
                "balance" : result3.data[2], 
                "department" : result3.data[3], 
                "office" : result3.data[4], 
                "internal" : result3.data[5], 
                "total_page" : result3.data[6], 
                "total_jobs" : result3.data[7]
            },
            "voip" : result4.data
        }

}

const getVoipMe = async ({ token }) => {
    //VOIP
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
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
        url: `${process.env.BASE_URL}/voip/get-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, eid: user }
    }

    return axios(config)
    .then(resp => {

        const user = resp.data[0]

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
            "role" : user.role,
            // "message" : "User found."
        }
    })
}

const getVoipUsers = async ({ token }) => {
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

const addVoipUser = async ({ token, name, displayname, password, confirm, emailaddress, extension }) => {
    
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/voip/add-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, params: { name, displayname, password, confirm, emailaddress, extension } }
    }

    return await axios(config)
    .then(resp => {
        //return { name, extension }
        return { "message" : resp.data.message }
    })

}

const deleteVoipUser = async ({ token, id}) => {

    let config = {
        method: 'DELETE',
        url: `${process.env.BASE_URL}/voip/remove-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, params: { id } }
    }

    return await axios(config)
    .then(resp => {
        return { "message" : resp.data.message }
    })

}

const getPapercutMe = async ({ token }) => {
    //PAPERCUT
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
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
        url: `${process.env.BASE_URL}/pc/get-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, eid: user }
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

const addPapercutUser = async({token, username, password, fullname, email, card, pin}) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/pc/add-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, data: { username, password, fullname, email, card, pin } }
    }

    return await axios(config)
    .then(resp => {
        return { "message" : resp.data.message }
    })

}

const deletePapercutUser = async({token, id}) => {

    let config = {
        method: 'DELETE',
        url: `${process.env.BASE_URL}/pc/remove-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, eid: id }
    }

    return await axios(config)
    .then(resp => {
        return { "message" : resp.data.message }
    })

}

const getKamarUser = async ({ token, id, fields }) => {

    //KAMAR
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/kamar/get-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, id, fields }
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

const getKamarUsers = async ({token, type, fields}) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/kamar/get-users`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, type, fields }
    }

    return await axios(config)
    .then(resp => {

        return resp.data.map(user => {

            return { 
                "id": user.id,
                "uuid": user.uuid,
                "role": user.role,
                "created": user.created,
                "uniqueid": user.uniqueid,
                "schoolindex": user.schoolindex,
                "username": user.username,
                "title": user.title,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "name" : `${user.firstname} ${user.lastname}`,
                "gender": user.gender,
                "datebirth": user.datebirth,
                "classification": user.classification,
                "position": user.position,
                "house": user.house,
                "startingdate": user.startingdate,
                "photocopierid": user.photocopierid,
                "email": user.email,
                "mobile": user.mobile,
                "extension": user.extension,
                "groups": user.groups
             }
        })
    })
    .catch(err => console.log(err))
}

const getNocoStaffMe = async ({ token }) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/me`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return axios(config)
    .then(resp => {

        const user = resp.data[0]

        return {
            "id" : user.Id,
            "name" : `${user.FirstName} ${user.LastName}`,
            "firstname": user.FirstName,
            "lastname": user.LastName,
            "createdat": user.CreatedAt,
            "updatedat": user.UpdatedAt,
            "eid": user.EID,
            "email": user.Email,
            "approle": user.AppRole,
            "devices1": user.Devices1,
            "service_accounts": user['Service Accounts'],
            "issmt": user.isSMT,
            "newthisyear": user.newThisYear,
            "dept_order": user.Dept_Order,
            "order": user.Order,
            "role1": user.Role1,
            "role2": user.Role2,
            "networkpassword": user.NetworkPassword,
            "macpassword": user.MacPassword,
            "ipadcode": user.iPadCode,
            "tumu_pin": user.TUMU_PIN,
            "tumu_id": user.TUMU_ID,
            "tecom_user_id": user.Tecom_User_ID,
            "tecom_user_pin": user.Tecom_User_PIN,
            "tecom_fob_id": user.Tecom_Fob_ID,
            "tecom_fob_number": user.Tecom_Fob_Number,
            "fobs": user.Fobs,
            "phonelogin": user.PhoneLogin,
            "phoneext": user.PhoneExt,
            "admin_roles": user['Admin-Roles'],
            "mathletics": user.Mathletics,
            "alarm_areas": user['Admin-Areas'],
            "readingeggs": user.Readingeggs,
            "isactive": user.isActive,
            "hasphoto": user.hasPhoto,
            "year": user.Year,
            "qualifications": user.Qualifications,
            "admin_rights": user['Admin-Rights'],
            "department": user.Department,
            "googleid": user.GoogleID
        }
    })
}

const getNocoStaffSingle = async ({ token, id }) => {
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/get-user`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, data : { eid: id } }
    }

    return axios(config)
    .then(resp => {

        const user = resp.data[0]

        return {
            "id" : user.Id,
            "name" : `${user.FirstName} ${user.LastName}`,
            "firstname": user.FirstName,
            "lastname": user.LastName,
            "createdat": user.CreatedAt,
            "updatedat": user.UpdatedAt,
            "eid": user.EID,
            "email": user.Email,
            "approle": user.AppRole,
            "devices1": user.Devices1,
            "service_accounts": user['Service Accounts'],
            "issmt": user.isSMT,
            "newthisyear": user.newThisYear,
            "dept_order": user.Dept_Order,
            "order": user.Order,
            "role1": user.Role1,
            "role2": user.Role2,
            "networkpassword": user.NetworkPassword,
            "macpassword": user.MacPassword,
            "ipadcode": user.iPadCode,
            "tumu_pin": user.TUMU_PIN,
            "tumu_id": user.TUMU_ID,
            "tecom_user_id": user.Tecom_User_ID,
            "tecom_user_pin": user.Tecom_User_PIN,
            "tecom_fob_id": user.Tecom_Fob_ID,
            "tecom_fob_number": user.Tecom_Fob_Number,
            "fobs": user.Fobs,
            "phonelogin": user.PhoneLogin,
            "phoneext": user.PhoneExt,
            "admin_roles": user['Admin-Roles'],
            "mathletics": user.Mathletics,
            "alarm_areas": user['Admin-Areas'],
            "readingeggs": user.Readingeggs,
            "isactive": user.isActive,
            "hasphoto": user.hasPhoto,
            "year": user.Year,
            "qualifications": user.Qualifications,
            "admin_rights": user['Admin-Rights'],
            "department": user.Department,
            "googleid": user.GoogleID
        }
    })
}

const getNocoStaffAll = async ({ token }) => {
    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/get-users`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return axios(config)
    .then(resp => {

        const users = resp.data

        console.log(users)

        return users.map(user => {
            return {
                "id" : user.Id,
                "name" : `${user.FirstName} ${user.LastName}`,
                "firstname": user.FirstName,
                "lastname": user.LastName,
                "createdat": user.CreatedAt,
                "updatedat": user.UpdatedAt,
                "eid": user.EID,
                "email": user.Email,
                "approle": user.AppRole,
                "devices1": user.Devices1,
                "service_accounts": user['Service Accounts'],
                "issmt": user.isSMT,
                "newthisyear": user.newThisYear,
                "dept_order": user.Dept_Order,
                "order": user.Order,
                "role1": user.Role1,
                "role2": user.Role2,
                "networkpassword": user.NetworkPassword,
                "macpassword": user.MacPassword,
                "ipadcode": user.iPadCode,
                "tumu_pin": user.TUMU_PIN,
                "tumu_id": user.TUMU_ID,
                "tecom_user_id": user.Tecom_User_ID,
                "tecom_user_pin": user.Tecom_User_PIN,
                "tecom_fob_id": user.Tecom_Fob_ID,
                "tecom_fob_number": user.Tecom_Fob_Number,
                "fobs": user.Fobs,
                "phonelogin": user.PhoneLogin,
                "phoneext": user.PhoneExt,
                "admin_roles": user['Admin-Roles'],
                "mathletics": user.Mathletics,
                "alarm_areas": user['Admin-Areas'],
                "readingeggs": user.Readingeggs,
                "isactive": user.isActive,
                "hasphoto": user.hasPhoto,
                "year": user.Year,
                "qualifications": user.Qualifications,
                "admin_rights": user['Admin-Rights'],
                "department": user.Department,
                "googleid": user.GoogleID
            }
        })

    })
}

const getNocoStudentMe = async ({ token }) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/me-student`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return axios(config)
    .then(resp => {

        const user = resp.data[0]

        return {
            "id": user.Id,
            "name" : `${user.Firstname} ${user.Lastname}`,
            "firstname": user.Firstname,
            "lastname": user.Lastname,
            "createdat": user.CreatedAt,
            "updatedat": user.UpdatedAt,
            "username": user.Username,
            "email": user.Email,
            "password": user.Password,
            "house": user.House,
            "dob": user.dob,
            "gender": user.Gender,
            "yearlevel" : user.YearLevel,
            "tutorgroup": user.TutorGroup,
            "hasNetworkAccess": user.HasNetworkAccess,
            "firstattendance": user.FirstAttendance,
            "studentId": user.StudentID,
            "kamar_password_changed": user.KamarChanged
        }
    })
}

const getNocoStudent = async ({ token, id }) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/get-student`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, data : { Username: id } }
    }

    return axios(config)
    .then(resp => {

        const user = resp.data[0]

        console.log(user)

        return {
            "id": user.Id,
            "name" : `${user.Firstname} ${user.Lastname}`,
            "firstname": user.Firstname,
            "lastname": user.Lastname,
            "createdat": user.CreatedAt,
            "updatedat": user.UpdatedAt,
            "username": user.Username,
            "email": user.Email,
            "password": user.Password,
            "house": user.House,
            "dob": user.dob,
            "gender": user.Gender,
            "yearlevel" : user.YearLevel,
            "tutorgroup": user.TutorGroup,
            "hasNetworkAccess": user.HasNetworkAccess,
            "firstattendance": user.FirstAttendance,
            "studentId": user.StudentID,
            "kamar_password_changed": user.KamarChanged
        }
    })

}

const getNocoStudents = async ({ token }) => {

    let config = {
        method: 'POST',
        url: `${process.env.BASE_URL}/noco/get-students`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token }
    }

    return axios(config)
    .then(resp => {

        const users = resp.data

        return users.map(user => {
            return {
                "id": user.Id,
                "name" : `${user.Firstname} ${user.Lastname}`,
                "firstname": user.Firstname,
                "lastname": user.Lastname,
                "createdat": user.CreatedAt,
                "updatedat": user.UpdatedAt,
                "username": user.Username,
                "email": user.Email,
                "password": user.Password,
                "house": user.House,
                "dob": user.dob,
                "gender": user.Gender,
                "yearlevel" : user.YearLevel,
                "tutorgroup": user.TutorGroup,
                "hasNetworkAccess": user.HasNetworkAccess,
                "firstattendance": user.FirstAttendance,
                "studentId": user.StudentID,
                "kamar_password_changed": user.KamarChanged
            }
        })

    })

}

const addNocoStaff = async ({ token }) => {
    return { "message" : "NEED TO DO" }
}

const addNocoStudent = async ({ token }) => {
    return { "message" : "NEED TO DO" }
}

const deleteNocoStaff = async ({ token }) => {
    return { "message" : "NEED TO DO" }
}

const deleteNocoStudent = async ({ token }) => {
    return { "message" : "NEED TO DO" }
}

const updateNocoStaff = async ({ token, eid, data }) => {

    let config = {
        method: 'PATCH',
        url: `${process.env.BASE_URL}/noco/update-staff`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, data, eid }
    }

    return await axios(config)
    .then(resp => {
        return { "message" : resp.data.message }
    })

}

const updateNocoStudent = async ({ token, Username, data }) => {

    let config = {
        method: 'PATCH',
        url: `${process.env.BASE_URL}/noco/update-student`,
        proxy: proxyList[process.env.PROXY_PASS],
        data : { token, data, Username }
    }

    return await axios(config)
    .then(resp => {
        return { "message" : JSON.stringify(resp.data) }
    })
}


module.exports = {
    root2 : {
        getMe,
        getMe2,
        getKamarUser,
        getKamarUsers,
        getVoipMe,
        getVoipUser,
        getVoipUsers,
        addVoipUser,
        deleteVoipUser,
        getPapercutMe,
        getPapercutUser,
        getPapercutUsers,
        addPapercutUser,
        deletePapercutUser,
        getNocoStaffMe,
        getNocoStaffSingle,
        getNocoStaffAll,
        getNocoStudentMe,
        getNocoStudent,
        getNocoStudents,
        addNocoStaff,
        addNocoStudent,
        deleteNocoStaff,
        deleteNocoStudent,
        updateNocoStaff,
        updateNocoStudent
    }
}