/* global requireShared, requireApi*/

// server.js
// load the things we need
const app       = require("express")(),
    passport    = require("passport"),
    Config      = require("config"),
    routes      = require("./routes"),
    bodyParser  = require("body-parser"),
    session     = require("express-session"),
    Account     = requireShared("models/account"),
    db          = requireShared("utilities/db");

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    // This code is not tested
    Account.getById(id)
    .then(user => {
        cb(null, user);
    })
    .catch(error => {
        cb(error);
    })
    //  This code is not tested ./
})

passport.use(requireApi("/passport-strategies/jwt").strategy);
passport.use(requireApi("/passport-strategies/local").strategy);
passport.use(requireApi("/passport-strategies/facebook").strategy);
passport.use(requireApi("/passport-strategies/google").strategy);

// Add Cors headers
app.use((req, res, next) => {
    if (Config["api-server"].cors.acceptAll === true) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        return next();
    }

    if (Config["api-server"].cors["Access-Control-Allow-Origin"]) {
        res.header("Access-Control-Allow-Origin", Config["api-server"].cors["Access-Control-Allow-Origin"]);
    }

    if (Config["api-server"].cors["Access-Control-Allow-Headers"]) {
        res.header("Access-Control-Allow-Headers", Config["api-server"].cors["Access-Control-Allow-Headers"]);
    }

    return next();
});

app.use((req, res, next) => {
    req.db = db;
    req.passport = passport
    req.vars = {
        NODE_ENV: process.env.NODE_ENV
    };
    next();
});

app.use(session({
    secret: Config.security.secret,
    resave: true,
    saveUninitialized: true
}));

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