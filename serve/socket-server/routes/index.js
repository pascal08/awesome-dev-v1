"use strict";

const User = require("./../controllers/user");
const Room = require("./../controllers/room");
const testRoutes = require("./test");

module.exports = app => {
    const user = User(app);
    const room = Room(app);

    user.init();
    room.join("general");

    app.route("user.update", user.update)
        .route("room.join", room.join)
        .route("room.leave", room.leave)

    testRoutes(app);

    return app;
};
