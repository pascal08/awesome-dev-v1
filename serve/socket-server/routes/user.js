/*global requireSocket */
"use strict";

const User = requireSocket("controllers/user");

module.exports = app => {
    const user = User(app);
    user.init();
    app.route("user.update", user.update)
    return app;
};
