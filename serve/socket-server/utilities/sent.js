"use strict";

const _ = require("lodash");

module.exports = (req, res) => ({
    // To self
    toSelf: (path, data) => {
        req.emit(path, data);
    },
    // To others
    toOthers: (path, data) => {
        const currentRoom = res.users[req.id].room;
        req.broadcast.to(currentRoom).emit(path, _.merge({
            room: currentRoom
        }, data));
    },
    // To others & self
    toEveryone: (path, data) => {
        const currentRoom = res.users[req.id].room;
        req.in(currentRoom).emit(path, _.merge({
            room: req.room
        }, data));
    }
});


