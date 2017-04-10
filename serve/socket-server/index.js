/* global requireUtility */
"use strict";

global.requireUtility = function(utility) {
    return require(`./utilities/${utility}`);
}

const Config      = require("config");
const io          = require("socket.io")(Config["socket-server"].port);
const coreRoutes  = require("./routes/");
const socketApp   = requireUtility("socket-app");
const testRoutes  = require("./routes/test");


const ioObject = {};

const defaultNamespace = io.of("/").on("connection", socket => {
    if (typeof ioObject["/"] !== "object") {
        ioObject["/"] = {};
    }

    const app = socketApp(socket, ioObject["/"], defaultNamespace);
    coreRoutes(app)
});

const testNamespace = io.of(Config["socket-server"].testPath).on("connection", socket => {
    if (typeof ioObject[Config["socket-server"].testPath] !== "object") {
        ioObject[Config["socket-server"].testPath] = {};
    }

    const app = socketApp(socket, ioObject[Config["socket-server"].testPath], testNamespace);
    testRoutes(app);
});
