/* global requireApi */

const isAuthorized = requireApi("passport-strategies/jwt").authorize;
const authorize = requireApi("passport-strategies/local").authorize;

module.exports = function(app) {

  // Home
    app.get("/", requireApi("controllers/home"));

  // Accounts / Authorization
    app.post("/accounts", requireApi("controllers/account/create"));
    app.get("/auth", isAuthorized, requireApi("controllers/auth/me"));
    app.get("/test", isAuthorized, (req,res) => {
        res.status(200).send({});
    });
    app.post("/auth", authorize);

    return app;
};
