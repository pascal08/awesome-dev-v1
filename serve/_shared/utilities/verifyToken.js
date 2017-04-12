"use strict";

const Config    = require("config"),
    jwt       = require("jsonwebtoken");

module.exports = token => new Promise((resolve, reject) => {
    if (!token) {
        return reject("noToken");
    }

    jwt.verify(token, Config.security.secret, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        resolve(decoded);
    })
})