/* global requireShared */

const googleStrategy = require("passport-google-oauth20").Strategy;
const Config = require("config");
const passport = require("passport");
const Account = requireShared("models/account");

const options = {
    clientID: Config.security.google.clientID,
    clientSecret: Config.security.google.clientSecret,
    callbackURL: Config.security.google.callbackURL,
    profileFields: ["id", "displayName", "email"],
    session: false
};




module.exports = {
    strategy: new googleStrategy( options, (accessToken, refreshToken, profile, done) => {
        Account.getByGoogleId( profile.id)
        .then(account => {
            return done(null, account);
        }).catch(() => {
            const user = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            };

            Account.createViaGoogle(user)
            .then(account => {
                return done(null, account);
            })
            .catch(err => {
                return done(err);
            })
        });
    }),


    authorize: (req, res, next) => {

        passport.authenticate("google", {scope: ["profile", "email"]},(err, account) => {

            if (typeof req.user === "undefined") {
                req.user = account;
            }

            if (account) {
                return next();
            }

            console.error(err);
            return res.status(406).send(err);
        })(req, res, next);
    }
}