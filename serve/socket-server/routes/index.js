"use strict";

const User = require("./../controllers/user");
const Room = require("./../controllers/room");
const socketRoute = require("./../utilities/socket-route");

module.exports = (req, res) => {
    const route = socketRoute(req, res);

    User.init(req, res);
    Room.join(req, res, "general");

    route.add("user.update", User.update)
        .add("room.join", Room.join)
        .add("room.leave", Room.leave)
        .add("disconnect", Room.leave)

    return req;
};
