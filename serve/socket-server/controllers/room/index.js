/* global requireUtility */
"use strict";

const _ = require("lodash");
const getuserObj = requireUtility("get-user-object");

module.exports = {
    join: (socket, req, roomName) => {

        if (typeof req.users !== "object") {
            return console.error("users collection is not defined", req.users);
        }

        if (typeof req.users[socket.id] !== "object") {
            return console.error(`User with id ${socket.id} needs to be an object`, req.users[socket.id]);
        }

        req.users[socket.id].room = roomName;

        const userObj = _.pick(getuserObj(socket, req), ["socketId", "room"]);

        socket.sent.toSelf("room.current", userObj);

        return this;
    },
    leave: (socket, req) => {
        const users = req.users;
        const user = users[socket.id];

        if (user) {
            // Notify others
            socket.sent.toOthers("user.left", {
                user: user,
                users: _(users).filter({
                    room: socket.room
                })
            });

            // Remove socket user from users list
            delete users[socket.id];
        }
        return this;
    }
};