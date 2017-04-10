"use strict";

module.exports = app => {

    // To self
    app.route("toSelf", socket => {
        socket.emit("toSelf.success", socket.body);
    })

    // To others (within the same namespace)
    app.route("toOthers", socket => {
        socket.broadcast.emit("toOthers.success", socket.body);
    });

    // To everyone (within the same namespace)
    app.route("toEveryone", socket => {
        app.namespace.emit("toEveryone.success", socket.body);
    });

    // To everyone (within the same room)
    app.route("toEveryoneInRoom", (socket, res) => {
        app.namespace.in(res.room).emit("toEveryoneInRoom.success", socket.body);
    });

    // To others (within the same room)
    app.route("toOthersInRoom", (socket, res) => {
        app.broadcast.in(res.room).emit("toOthersInRoom.success",socket.body);
    });

    return app;
};
