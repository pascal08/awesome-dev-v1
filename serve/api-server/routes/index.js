/* global requireApi */

const isAuthorized = requireApi("passport-strategies/jwt").authorize;
const localAuthorize = requireApi("passport-strategies/local").authorize;
const facebookAuthorize = requireApi("passport-strategies/facebook").authorize;
const googleAuthorize = requireApi("passport-strategies/google").authorize;

const returnAccessToken = requireApi("controllers/auth/access-token");


module.exports = function(app) {

  // Home
    app.get("/", requireApi("controllers/home"));

  // Accounts / Authorization
    app.post("/register", requireApi("controllers/account/create"));
    app.get("/auth", isAuthorized, requireApi("controllers/auth/me"));

    // Facebook auth
    app.get("/auth/facebook", requireApi("middleware/auth/set-return-url"), facebookAuthorize);
    app.get("/auth/facebook/callback", facebookAuthorize, returnAccessToken);

    // Google auth
    app.get("/auth/google", requireApi("middleware/auth/set-return-url"), googleAuthorize);
    app.get("/auth/google/callback", googleAuthorize, returnAccessToken);

    // Local auth
    app.post("/auth", localAuthorize, returnAccessToken);

    app.get("/test", isAuthorized, (req,res) => {
        res.status(200).send(req.user);
    });

    return app;
};
