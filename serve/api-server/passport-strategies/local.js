/* global requireShared, requireApi */

const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Account = requireShared("models/account");
const signToken = requireShared("utilities/signToken");

const hasPassword = requireApi("validators/object/hasPassword");
const hasEmail = requireApi("validators/object/hasEmail");
const authByEmail = requireApi("validators/account/authByEmail");

const options = {
    usernameField: "email",
    session: false
};




module.exports = {
    strategy: new localStrategy( options, (email, password, done) => {
        Account.getByEmail(email, password)
        .then(account => {
            return done(null, {accessToken: signToken(account)});
        })
        .catch(err => {
            return done({errorType: err});
        });
    }),


    authorize: (req, res, next) => {
        const credentials = req.body;

        Promise.all([
            hasPassword(credentials),
            hasEmail(credentials),
            authByEmail(credentials)
        ]).then(() => {

            passport.authenticate("local", (err, account) => {

                if (account) {
                    return res.status(202).send(account);
                }

                return res.status(406).send(err);
            })(req, res, next);
        })
        .catch(err => {
            res.status(406);
            res.json(err);
        });
    }
}
