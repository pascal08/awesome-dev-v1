"use strict";

const socketIoHelper = require("./../../utilities/socket-io-helper");

module.exports = (req, res) => {
    const helper = socketIoHelper(req);

    // when the client emits 'typing', we broadcast it to others
    req.on("typing", () => {
        helper.toOthers("typing", {
            user: req.user
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    req.on("stop typing", () => {
        helper.toOthers("stop typing", {
            user: req.user
        });
    });

    req.on("user.sent.message", message => {
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
            req: req.user,
            users: res.users,
            message: message
        });
    });


    req.on("user.start.typing", () => {
        // If user object is null, request new user object and retry
        if (!helper.validateConnection({
            "user.start.typing": ""
        })) {
            return;
        }

        // Send message
        helper.toOthers("user.started.typing", {
            user: req.user
        });
    });

    req.on("user.stop.typing", () => {
        // If user object is null, request new user object and retry
        if (!helper.validateConnection({
            "user.start.typing": ""
        })) {
            return;
        }

        // Send message
        helper.toOthers("user.stopped.typing", {
            user: req.user
        });
    });
};
