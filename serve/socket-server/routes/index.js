"use strict";

const User = require("./../controllers/user");
const Room = require("./../controllers/room");
const socketApp = require("./../utilities/socket-app");

module.exports = (req, res) => {
    const app = socketApp(req, res);
    app.use("sent", require("./../utilities/sent"));

    User.init(req, res);
    Room.join(req, res, "general");

    app.route("user.update", User.update)
        .route("room.join", Room.join)
        .route("room.leave", Room.leave)
        .route("disconnect", Room.leave)

    return req;
};
