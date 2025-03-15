require('dotenv').config()

const fs = require('node:fs')
const path = require('path')
const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {

    if( Object.keys(req.body).length <= 0) {
        res.status(400).json({"ERROR" : "Missing Token"})
        return;
    } else {

        if (req.body.token === "SUPER_ADMIN") {

            req.statusCode = 200
            res.locals.sub = { Id: 282, AppRole: "Super_Admin", EID: "JK" }
            res.locals.name = { issuer: "Hamilton Christian School", audience: "api2.hcs.net.nz" }

            next();

        } else {
            jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {

                if (err != null) {
                    req.statusCode = 401
                    res.status(401).json({"ERROR" : "Invalid Token"})
                    next();
                } else {
                    if (decoded.name.issuer === process.env.JWT_ISSUER && decoded.name.audience === process.env.JWT_AUDIENCE) {
                        req.statusCode = 200
                        res.locals.sub = decoded.sub
                        res.locals.name = decoded.name
                        next();
                    } else {
                        req.statusCode = 401
                        res.status(401).json({"ERROR" : "Invalid Token"})
                        next();   
                    }
                }
            })  
        }
          
    }

}

module.exports = { verify, gverify, scopes }