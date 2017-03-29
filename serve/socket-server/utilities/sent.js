"use strict";

const _ = require("lodash"),
    Config = require("config"),
    io = require("socket.io")(Config["socket-server"].port);

module.exports = (socket, req) => ({
    // To self
    toSelf: (path, data) => {
        socket.emit(path, data);
    },
    // To others
    toOthers: (path, data) => {
        const currentRoom = req.users[socket.id].room;
        socket.broadcast.to(currentRoom).emit(path, _.merge({
            room: currentRoom
        }, data));
    },
    // To others & self
    toEveryone: (path, data) => {
        const currentRoom = req.users[socket.id].room;
        io.sockets.in(currentRoom).emit(path, _.merge({
            room: socket.room
        }, data));
    }
});


