/* global requireApi */


module.exports = function(app) {

  // Home
    app.get("/", requireApi("controllers/home"));

  // Accounts / Authorization
    app.post("/accounts", requireApi("controllers/account/create"));
    app.get("/auth", requireApi("controllers/auth/me"));
    app.post("/auth", requireApi("controllers/auth"));

    return app;
};
