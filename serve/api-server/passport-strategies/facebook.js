/* global requireShared */

const facebookStrategy = require("passport-facebook").Strategy;
const Config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Account = requireShared("models/account");

const options = {
    clientID: Config.security.facebook.appId,
    clientSecret: Config.security.facebook.appSecret,
    callbackURL: Config.security.facebook.callbackURL,
    session: false
};




module.exports = {
    strategy: new facebookStrategy( options, (accessToken, refreshToken, profile, done) => {

        Account.getByFacebookId( profile.id)
        .then(account => {
            return done(null, account);
        }).catch(() => {
            const user = {
                name: profile.displayName,
                facebookId: profile.id
            };

            Account.createByFacebook(user)
            .then(account => {
                return done(null, account);
            })
            .catch(err => {
                return done(err);
            })
        });
    }),


    authorize: (req, res, next) => {

        passport.authenticate("facebook", (err, account) => {

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