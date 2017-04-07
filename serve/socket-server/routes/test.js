"use strict";

module.exports = app => {

    app.route("toSelf", req => {
        req.emit("toSelf.success", req.body);
    })

    app.route("toOthers", req => {
        req.broadcast.emit("toOthers.success", req.body);
    });

    app.route("toEveryone", (req, res) => {
        console.log(req, res);
    });

    ////////////////////////////////////////////////////////
    // Same namespace
    ////////////////////////////////////////////////////////
    app.route("toOthersWithinSameNamespace", (req, res) => {
        console.log(req, res);
    });

    app.route("toEveryoneWithinSameNamespace", (req, res) => {
        console.log(req, res);
    });


    ////////////////////////////////////////////////////////
    // Same room
    ////////////////////////////////////////////////////////
    app.route("toOthersWithinSameRoom", (req, res) => {
        console.log(req, res);
    });

    app.route("toEveryoneWithinSameRoom", (req, res) => {
        console.log(req, res);
    });

    return app;
};
