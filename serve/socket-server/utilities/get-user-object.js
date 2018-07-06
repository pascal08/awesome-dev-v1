"use strict";

const _ = require("lodash");

module.exports = (req, res) => {
    let result = {};
    if (req.users) {
        result = _.merge(result, res.users[req.id]);
    }
    if (process.env.NODE_ENV === "development") {
        result = _.merge(result, { socketId: req.id });
    }
    return result;
}