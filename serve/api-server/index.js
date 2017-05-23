/* global requireShared, requireApi*/

// server.js
// load the things we need
const app       = require("express")(),
    passport    = require("passport"),
    Config      = require("config"),
    routes      = require("./routes"),
    bodyParser  = require("body-parser"),
    db          = requireShared("utilities/db");

passport.serializeUser((user, cb) => {
    console.log(user);
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    // findUser(id, cb)
})

passport.use(requireApi("/passport-strategies/jwt").strategy);
// console.log(passport._strategies);

app.use((req, res, next) => {
    req.db = db;
    req.passport = passport
    req.vars = {
        NODE_ENV: process.env.NODE_ENV
    };
    next();
});

app.use(passport.initialize())
app.use(passport.session())

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));


routes(app);


app.listen(Config["api-server"].http.port);
console.log(`${Config["api-server"].http.port} is the magic port`);

module.exports = app;