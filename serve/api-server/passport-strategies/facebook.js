/* global requireShared */

const facebookStrategy = require("passport-facebook").Strategy;
const Config = require("config");
const passport = require("passport");
const Account = requireShared("models/account");

const options = {
    clientID: Config.security.facebook.clientID,
    clientSecret: Config.security.facebook.clientSecret,
    callbackURL: Config.security.facebook.callbackURL,
    profileFields: ["id", "displayName", "email"],
    session: false
};




module.exports = {
    strategy: new facebookStrategy( options, (accessToken, refreshToken, profile, done) => {

        Account.getByFacebookId( profile.id)
        .then(account => {
            return done(null, account);
        }).catch(() => {
            const user = {
                facebookId: profile.id,
                name: profile._json.name,
                email: profile._json.email
            };

            Account.createViaFacebook(user)
            .then(account => {
                return done(null, account);
            })
            .catch(err => {
                return done(err);
            })
        });
    }),


    authorize: (req, res, next) => {

        passport.authenticate("facebook", {scope: ["email"]},(err, account) => {

            if (typeof req.user === "undefined") {
                req.user = account;
            }

            if (account) {
                return next();
            }

            return res.status(406).send(err);
        })(req, res, next);
    }
}