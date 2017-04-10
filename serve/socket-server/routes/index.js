"use strict";

const User = require("./../controllers/user");
const Room = require("./../controllers/room");
const testRoutes = require("./test");
const socketApp = require("./../utilities/socket-app");

module.exports = app => {

    app.use("sent", require("./../utilities/sent"));

    User.init(app.req, app.res);
    Room.join(app.req, app.res, "general");

    app.route("user.update", User.update)
        .route("room.join", Room.join)
        .route("room.leave", Room.leave)
        .route("disconnect", Room.leave)

    testRoutes(app);
    
    return app;
};
