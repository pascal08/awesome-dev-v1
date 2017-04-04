/* global requireUtility */

"use strict";

const jsonic = require("jsonic")
const _ = require("lodash");
const getuserObj = requireUtility("get-user-object");

module.exports = {
    init: (req, res) => {

        if (typeof res.users !== "object") {
            res.users = {};
        }

        // Add user
        res.users[req.id] = {};
    },
    update: (req, res) => {

        const props = jsonic(req.body);

        if (typeof props !== "object") {
            return console.error("user.update value should be an object, is ", props, req.body);
        }

        _.each(props, (value, key) => {
            if (key == "room") {
                return;
            }
            res.users[req.id][key] = value;
        });


        const userObj = _.omit(getuserObj(req, res), ["room"]);

        req.sent.toSelf("user.current", userObj)
    }
};
