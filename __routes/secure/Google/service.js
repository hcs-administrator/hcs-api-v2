require('dotenv').config()

const express = require('express')
const router = express()
const axios = require('axios');

const { gverify } = require("../../../__functions/verify")
const { proxyList } = require('../../../__functions/proxylist')

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const {google} = require('googleapis');

router.post('/find-user-by-email-full', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const admin = google.admin({ version: 'directory_v1', auth: res.locals.authClient });

            const result = await admin.users.list({
              customer: res.locals.authClient.customerId,
              query: `email=${req.body.email}`,
              projection: 'basic',
              alt: 'json'
            });

            res.send(result.data.users[0])
        }
    }

})

router.post('/find-user-by-email-basic', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const admin = google.admin({ version: 'directory_v1', auth: res.locals.authClient });

            const result = await admin.users.list({
              customer: res.locals.authClient.customerId,
              query: `email=${req.body.email}`,
              projection: 'basic',
              alt: 'json'
            });

            //id,primaryEmail,name,suspended,emails,customerId,orgUnitPath
            const { kind,etag,isAdmin,isDelegatedAdmin,lastLoginTime,creationTime,agreedToTerms,archived,changePasswordAtNextLogin,ipWhitelisted,externalIds,addresses,organizations,phones,languages,nonEditableAliases,isMailboxSetup,isEnrolledIn2Sv,isEnforcedIn2Sv,includeInGlobalAddressList,thumbnailPhotoUrl,thumbnailPhotoEtag, ...output} = result.data.users[0]

            res.send(output)

        }
    }

})

router.post('/find-user-id-by-email', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const admin = google.admin({ version: 'directory_v1', auth: res.locals.authClient });

            const result = await admin.users.list({
              customer: res.locals.authClient.customerId,
              query: `email=${req.body.email}`,
              projection: 'basic',
              alt: 'json'
            });

            //id,
            const { primaryEmail,name,suspended,emails,customerId,orgUnitPath,kind,etag,isAdmin,isDelegatedAdmin,lastLoginTime,creationTime,agreedToTerms,archived,changePasswordAtNextLogin,ipWhitelisted,externalIds,addresses,organizations,phones,languages,nonEditableAliases,isMailboxSetup,isEnrolledIn2Sv,isEnforcedIn2Sv,includeInGlobalAddressList,thumbnailPhotoUrl,thumbnailPhotoEtag, ...output} = result.data.users[0]

            res.send(output)

        }
    }

})

router.post('/find-user-gaia-by-email', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            // const service = google.chat({version: 'v1', auth: res.locals.authClient})

            // const resp = await service.spaces.list({
            //     filter: "spaceType = \"DIRECT_MESSAGE\""
            // })

            // console.log(resp)

            const service = google.people({version: 'v1', auth: res.locals.authClient})
            
            const resp = await service.people.connections.list({
                resourceName: 'people/me',
                personFields: 'names,metadata'
            })

            // const resp = await service.people.searchDirectoryPeople({
            //     resourceName: 'people/me',
            //     pageSize: 10,
            //     personFields: 'names,emailAddresses,metadata,imClients,clientData',
            // })

            console.log(resp)


            //google.admin({ version: 'people', auth: res.locals.authClient });

            // const result = await admin.users.list({
            //   customer: res.locals.authClient.customerId,
            //   query: `email=${req.body.email}`,
            //   projection: 'basic',
            //   alt: 'json'
            // });

            //id,
            // const { primaryEmail,name,suspended,emails,customerId,orgUnitPath,kind,etag,isAdmin,isDelegatedAdmin,lastLoginTime,creationTime,agreedToTerms,archived,changePasswordAtNextLogin,ipWhitelisted,externalIds,addresses,organizations,phones,languages,nonEditableAliases,isMailboxSetup,isEnrolledIn2Sv,isEnforcedIn2Sv,includeInGlobalAddressList,thumbnailPhotoUrl,thumbnailPhotoEtag, ...output} = result.data.users[0]

            res.send("TEst...")

        }
    }

})

router.post('/update-user-details', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            console.log(req.body.resource)

            const admin = google.admin({ version: 'directory_v1', auth: res.locals.authClient });

            const result = await admin.users.update({
                userKey: req.body.userkey,
                resource: req.body.resource
            },(err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                    res.send(data)
                }
            })

            //const { id, primaryEmail,name,suspended,emails,customerId,orgUnitPath,kind,etag,isAdmin,isDelegatedAdmin,lastLoginTime,creationTime,agreedToTerms,archived,changePasswordAtNextLogin,ipWhitelisted,externalIds,addresses,organizations,phones,languages,nonEditableAliases,isMailboxSetup,isEnrolledIn2Sv,isEnforcedIn2Sv,includeInGlobalAddressList,thumbnailPhotoUrl,thumbnailPhotoEtag, ...output} = result.data.users[0]
        }
    }

})

router.post('/add-user-aliases', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            console.log(req.body.resource)

            const admin = google.admin({ version: 'directory_v1', auth: res.locals.authClient });

            await admin.users.aliases.insert({
                userKey: req.body.userkey,
                requestBody:{
                    alias: req.body.email
                }
            },(err, data) => {
                if (err) {
                    console.log(err.errors)
                    res.status(409).send(err.errors[0])
                } else {
                    console.log(data)
                    res.status(200).send(data)
                }
            })

            //const { id, primaryEmail,name,suspended,emails,customerId,orgUnitPath,kind,etag,isAdmin,isDelegatedAdmin,lastLoginTime,creationTime,agreedToTerms,archived,changePasswordAtNextLogin,ipWhitelisted,externalIds,addresses,organizations,phones,languages,nonEditableAliases,isMailboxSetup,isEnrolledIn2Sv,isEnforcedIn2Sv,includeInGlobalAddressList,thumbnailPhotoUrl,thumbnailPhotoEtag, ...output} = result.data.users[0]
        }
    }

})

router.post('/gmail-get-email-aliases', gverify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            const gmail = google.gmail({version: 'v1', auth: res.locals.authClient });
            const result = await (await gmail.users.settings.sendAs.list({userId: "me"})).data.sendAs

            res.send(result)
        }
    }

})

//gmail-get-email-aliases

module.exports = router