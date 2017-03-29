"use strict";

const User = require("./../actions/user");
const Room = require("./../actions/room");
const socketRoute = require("./../utilities/socket-route");

module.exports = (socket, req) => {
    const route = socketRoute(socket, req);

    User.init(socket, req);
    Room.join(socket, req, "general");

    route.add("user.update", User.update)
        .add("room.join", Room.join)
        .add("room.leave", Room.leave)
        .add("disconnect", Room.leave)

    return req;
};
