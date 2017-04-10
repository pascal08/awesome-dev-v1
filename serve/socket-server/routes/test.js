"use strict";

module.exports = app => {

    // To self
    app.route("toSelf", req => {
        req.emit("toSelf.success", req.body);
    })

    // To others (within the same namespace)
    app.route("toOthers", req => {
        req.broadcast.emit("toOthers.success", req.body);
    });

    // To everyone (within the same namespace)
    app.route("toEveryone", req => {
        app.namespace.emit("toEveryone.success", req.body);
    });

    // To everyone (within the same room)
    app.route("toEveryoneInRoom", (req, res) => {
        app.namespace.in(res.room).emit("toEveryoneInRoom.success", req.body);
    });

    // To others (within the same room)
    app.route("toOthersInRoom", (req, res) => {
        app.broadcast.in(res.room).emit("toOthersInRoom.success",req.body);
    });

    return app;
};
