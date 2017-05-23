const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Config = require("config");
const {pick, size} = require("lodash");
const passport = require("passport");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: Config.security.secret,
    algorithms: [Config.security.hash]
};




module.exports = {
    strategy: new JwtStrategy(options, (jwt_payload, done) => {
        const user = pick(jwt_payload, ["_id", "name", "email"]);

        return done(null, user);
    }),


    authorize: (req, res, next) => {
        passport.authenticate("jwt", (err, user, info) => {

            if (err) {
                return next(err);
            }

            // Validate missing token
            if (info && info.message === "No auth token") {
                return res.status(422).send({errorType: "noAuthToken"});
            }

            // Validate corrupted token
            if (!user) {
                return res.status(422).send({errorType: "corruptedJWT"});
            }

            // Log the user in so user var is accesible via req.user
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }

                next();
            });
        })(req, res, next);
    }
}