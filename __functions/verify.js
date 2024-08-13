require('dotenv').config()

const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {

    if( Object.keys(req.body).length <= 0) {
        res.status(400).json({"ERROR" : "Missing Token"})
        return;
    } else {
        
        jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {

            if (err != null) {
                res.status(401).json({"ERROR" : "Invalid Token"})
                next();
            } else {

                if (decoded.name.issuer === process.env.JWT_ISSUER && decoded.name.audience === process.env.JWT_AUDIENCE) {
                    res.locals.sub = decoded.sub
                    res.locals.name = decoded.name
                    next();
                } else {
                    res.status(401).json({"ERROR" : "Invalid Token"})
                    next();   
                }
            }
        })    
    }

}

module.exports = { verify }