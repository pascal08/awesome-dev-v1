"use strict";

const User = require("./../controllers/user");
const Room = require("./../controllers/room");
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
