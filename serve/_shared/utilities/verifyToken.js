"use strict";

const CONFIG    = require("config"),
    jwt       = require("jsonwebtoken");

module.exports = token => new Promise((resolve, reject) => {
    if (!token) {
        return reject("noToken");
    }

    jwt.verify(token, CONFIG.security.secret, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        resolve(decoded);
    })
})