"use strict";

const _ = require("lodash");

module.exports = (req, res) => _.merge(
    { socketId: req.id },  // This is for dev/bugfixing only
    res.users[req.id]
)