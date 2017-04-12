/* global requireShared*/

// server.js
// load the things we need
const app       = require("express")(),
    Config      = require("Config"),
    routes      = require("./routes"),
    bodyParser  = require("body-parser"),
    db          = requireShared("utilities/db");

app.use((req, res, next) => {
    req.db = db;
    req.vars = {
        NODE_ENV: process.env.NODE_ENV
    };
    next();
});

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