/* global requireController */


module.exports = function(app) {

  // Home
    app.get("/", requireController("home"));

  // Accounts / Authorization
    app.post("/accounts", requireController("account/create"));
    app.get("/auth", requireController("auth/me"));
    app.post("/auth", requireController("auth"));

    return app;
};
