"use strict";

const _ = require("lodash");

module.exports = (req, res) => {
    if (process.env.NODE_ENV === "development") {
        return _.merge(
            { socketId: req.id },  // This is for dev/bugfixing only
            res.users[req.id]
        );
    }
    return res.users[req.id];
}