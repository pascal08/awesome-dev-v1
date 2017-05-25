/* global requireShared */

const facebookStrategy = require("passport-facebook").Strategy;
const Config = require("config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Account = requireShared("models/account");
const signToken = requireShared("utilities/signToken");

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
            return done(null, {accessToken: signToken(account)});
        }).catch(() => {
            const user = {
                name: profile.displayName,
                facebookId: profile.id
            };

            Account.createByFacebook(user)
            .then(account => {
                return done(null, {accessToken: signToken(account)});
            })
            .catch(err => {
                return done(err);
            })
        });
    }),


    authorize: (req, res, next) => {

        passport.authenticate("facebook", (err, account) => {
            if (account) {
                return res.status(202).send(account);
            }

            return res.status(406).send(err);
        })(req, res, next);
    }
}