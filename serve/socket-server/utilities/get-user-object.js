"use strict";

const _ = require("lodash");

module.exports = (socket, req) => _.merge(
    { socketId: socket.id },  // This is for dev/bugfixing only
    req.users[socket.id]
)