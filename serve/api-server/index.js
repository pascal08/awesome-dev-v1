/* global requireShared*/

// server.js
// load the things we need
const app       = require("express")(),
    CONFIG      = require("config"),
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


app.listen(CONFIG["api-server"].http.port);
console.log(`${CONFIG["api-server"].http.port} is the magic port`);

module.exports = app;