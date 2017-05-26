/* global requireApi */

const isAuthorized = requireApi("passport-strategies/jwt").authorize;
const localAuthorize = requireApi("passport-strategies/local").authorize;
const facebookAuthorize = requireApi("passport-strategies/facebook").authorize;
const googleAuthorize = requireApi("passport-strategies/google").authorize;

// Middleware
const setReturnUrl = requireApi("middleware/auth/set-return-url")


module.exports = function(app) {
    // Home
    app.get("/"                                                                     , requireApi("controllers/home"));
    // Accounts / Authorization
    app.delete("/accounts/:accountId"                                               , requireApi("controllers/account/delete"));
    app.post("/accounts"                                                            , requireApi("controllers/account/create"));
    app.post("/register"                                                            , requireApi("controllers/account/create"));
    app.get("/auth"                     , isAuthorized                              , requireApi("controllers/auth/me"));
    // Facebook auth
    app.get("/auth/facebook"            , setReturnUrl , facebookAuthorize);
    app.get("/auth/facebook/callback"   , facebookAuthorize                         , requireApi("controllers/auth/access-token"));
    // Google auth
    app.get("/auth/google"              , setReturnUrl, googleAuthorize);
    app.get("/auth/google/callback"     , googleAuthorize                           , requireApi("controllers/auth/access-token"));
    // Local auth
    app.post("/auth"                    , localAuthorize                            , requireApi("controllers/auth/access-token"));




    app.get("/test", isAuthorized, (req,res) => {
        res.status(200).send(req.user);
    });

    return app;
};
