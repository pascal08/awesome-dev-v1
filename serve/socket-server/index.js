"use strict";

global.requireUtility = function(utility) {
    return require(`./utilities/${utility}`);
}

const Config      = require("config");
const io          = require("socket.io")(Config["socket-server"].port);
const coreRoutes  = require("./routes/");


const ioObject = {};

io.of("/").on("connection", socket => {
    if (typeof ioObject["/"] !== "object") {
        ioObject["/"] = {};
    }

    coreRoutes(socket, ioObject["/"]);
});