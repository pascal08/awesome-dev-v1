/* global requireApi */

const Config            = require("config");
const isAuthorized      = requireApi("passport-strategies/jwt").authorize;
const isSelf            = requireApi("middleware/auth/is-self");
const localAuthorize    = requireApi("passport-strategies/local").authorize;

// Middleware
const setReturnUrl = requireApi("middleware/auth/set-return-url");


module.exports = function(app) {
    // Home
    app.get("/"                                                                                    , requireApi("controllers/home"));
    // Accounts / Authorization
    app.post("/accounts"                                                                           , requireApi("controllers/account/create"));
    app.post("/register"                                                                           , requireApi("controllers/account/create"));
    app.post("/accounts/request-password-reset"                                                    , requireApi("controllers/account/request-password-reset"));
    // For simple styling of html template: app.get("/accounts/:accountId/forgot-password"                                                 , requireApi("mail-controllers/account/forgot-password"));
    app.get("/auth"                                    , isAuthorized                              , requireApi("controllers/auth/me"));
    app.post("/auth/access-token"                                                                  , requireApi("controllers/account/access-token"));
    app.delete("/accounts/:accountId"                  , isAuthorized, isSelf                      , requireApi("controllers/account/delete"));
    app.post("/accounts/:accountId"                    , isAuthorized, isSelf                      , requireApi("controllers/account/update"));
    app.patch("/accounts/:accountId"                   , isAuthorized, isSelf                      , requireApi("controllers/account/update"));



    // Local auth
    app.post("/auth"                                    , localAuthorize                            , requireApi("controllers/auth/refresh-token"));

    // Facebook auth
    if (Config.security.facebook && Config.security.facebook.clientID) {
        const facebookAuthorize = requireApi("passport-strategies/facebook").authorize;
        app.get("/auth/facebook"                        , setReturnUrl , facebookAuthorize         );
        app.get("/auth/facebook/callback"               , facebookAuthorize                        , requireApi("controllers/auth/refresh-token"));
    }
    // Google auth
    if (Config.security.google && Config.security.google.clientID) {
        const googleAuthorize   = requireApi("passport-strategies/google").authorize;

        app.get("/auth/google"                          , setReturnUrl, googleAuthorize            );
        app.get("/auth/google/callback"                 , googleAuthorize                          , requireApi("controllers/auth/refresh-token"));
    }


    app.get("/test", isAuthorized, (req,res) => {
        res.status(200).send(req.user);
    });

    return app;
};