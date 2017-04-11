/* global requireSocket */
"use strict";

const Config      = require("config");
const io          = require("socket.io")(Config["socket-server"].port);
const socketApp   = requireSocket("utilities/socket-app");
const ioObject    = {};

// Routes
const testRoutes  = require("./routes/test");
const userRoutes  = require("./routes/user");
const roomRoutes  = require("./routes/room");



const defaultNamespace = io.of("/").on("connection", socket => {
    if (typeof ioObject["/"] !== "object") {
        ioObject["/"] = {};
    }


    const app = socketApp(socket, ioObject["/"], defaultNamespace);

    testRoutes(app);
    userRoutes(app);
    roomRoutes(app);
});

const testNamespace = io.of(Config["socket-server"].testPath).on("connection", socket => {
    if (typeof ioObject[Config["socket-server"].testPath] !== "object") {
        ioObject[Config["socket-server"].testPath] = {};
    }


    const app = socketApp(socket, ioObject[Config["socket-server"].testPath], testNamespace);

    testRoutes(app);
    roomRoutes(app);
});
