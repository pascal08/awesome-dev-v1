/* global requireUtility */

"use strict";

const jsonic = require("jsonic")
const _ = require("lodash");
const getuserObj = requireUtility("get-user-object");

module.exports = {
    init: (socket, req) => {

        if (typeof req.users !== "object") {
            req.users = {};
        }

        // Add user
        req.users[socket.id] = {};
    },
    update: (socket, req, value) => {
        const props = jsonic(value);

        if (typeof props !== "object") {
            return console.error("user.update value should be an object, is ", props, value);
        }

        _.each(props, (value, key) => {
            if (key == "room") {
                return;
            }
            req.users[socket.id][key] = value;
        });


        const userObj = _.omit(getuserObj(socket, req), ["room"]);

        socket.sent.toSelf("user.current", userObj)
    }
};
