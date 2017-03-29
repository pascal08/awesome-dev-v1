"use strict";

const socketIoHelper = require("./../../utilities/socket-io-helper");

module.exports = (socket, req) => {
    const helper = socketIoHelper(socket);

    // when the client emits 'typing', we broadcast it to others
    socket.on("typing", () => {
        helper.toOthers("typing", {
            user: socket.user
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on("stop typing", () => {
        helper.toOthers("stop typing", {
            user: socket.user
        });
    });

    socket.on("user.sent.message", message => {
        // Input is not a string, do nothing
        if (typeof message !== "string") {
            return;
        }

        // If user object is null, request new user object and retry
        if (!helper.validateConnection({
            "user.sent.message": message
        })) {
            return;
        }

        // Send message
        helper.toOthers("user.receive.message", {
            user: socket.user,
            users: req.users,
            message: message
        });
    });


    socket.on("user.start.typing", () => {
        // If user object is null, request new user object and retry
        if (!helper.validateConnection({
            "user.start.typing": ""
        })) {
            return;
        }

        // Send message
        helper.toOthers("user.started.typing", {
            user: socket.user
        });
    });

    socket.on("user.stop.typing", () => {
        // If user object is null, request new user object and retry
        if (!helper.validateConnection({
            "user.start.typing": ""
        })) {
            return;
        }

        // Send message
        helper.toOthers("user.stopped.typing", {
            user: socket.user
        });
    });
};
