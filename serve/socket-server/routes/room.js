"use strict";

const Room = require("./../controllers/room");

module.exports = app => {
    const room = Room(app);

    room.join("general");

    app.route("room.join", room.join)
       .route("room.leave", room.leave)

    return app;
};
