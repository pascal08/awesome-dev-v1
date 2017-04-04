/* global requireUtility */
"use strict";

const _ = require("lodash");
const getuserObj = requireUtility("get-user-object");

module.exports = {
    join: (req, res, roomName) => {

        if (typeof res.users !== "object") {
            return console.error("users collection is not defined", res.users);
        }

        if (typeof res.users[req.id] !== "object") {
            return console.error(`User with id ${req.id} needs to be an object`, res.users[req.id]);
        }

        res.users[req.id].room = roomName;

        const userObj = _.pick(getuserObj(req, res), ["socketId", "room"]);

        req.sent.toSelf("room.current", userObj);

        return this;
    },
    leave: (req, res) => {
        const users = res.users;
        const user = users[req.id];

        if (user) {
            // Notify others
            req.sent.toOthers("user.left", {
                user: user,
                users: _(users).filter({
                    room: req.room
                })
            });

            // Remove socket user from users list
            delete users[req.id];
        }
        return this;
    }
};