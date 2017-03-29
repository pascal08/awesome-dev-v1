"use strict";

const verifyToken       = requireShared("utilities/verifyToken");


module.exports = function(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    return new Promise((resolve, reject) => {
        // decode token
        verifyToken(token).then(decoded => {
            req.accessToken = decoded;
            next();
            resolve(decoded);
        })
        .catch(err => {
            if (err == "noToken") {
                res.status(403).send("No token provided.");
                return reject("noToken")
            }

            res.status(403).send("A valid token should be provided for access");
            reject("noCorrectToken")
        })
    });
}