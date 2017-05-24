/* global requireApi */

const isAuthorized = requireApi("passport-strategies/jwt").authorize;
const authorize = requireApi("passport-strategies/local").authorize;
const facebookAuthorize = requireApi("passport-strategies/facebook").authorize;

module.exports = function(app) {

  // Home
    app.get("/", requireApi("controllers/home"));

  // Accounts / Authorization
    app.post("/register", requireApi("controllers/account/create"));
    app.get("/auth", isAuthorized, requireApi("controllers/auth/me"));

    app.get("/auth/facebook", facebookAuthorize);
    app.get("/auth/facebook/callback", facebookAuthorize);
    app.post("/auth", authorize);

    app.get("/test", isAuthorized, (req,res) => {
        res.status(200).send({});
    });

    return app;
};
