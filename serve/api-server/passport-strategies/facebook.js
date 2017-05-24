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
    strategy: new facebookStrategy( options, (accessToken, refreshToken, profile, cb) => {

        Account.getViaFacebookId( profile.id)
        .then(user => {
            return cb(null, user);
        }).catch(() => {
            const user = {
                name: profile.displayName,
                facebookId: profile.id
            };

            Account.createByFacebook(user)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            })
        });
    }),


    authorize: (req, res, next) => {

        passport.authenticate("facebook", (err, user) => {
            if (user) {
                return res.status(202).send(user);
            }

            return res.status(406).send(err);
        })(req, res, next);
    }
}