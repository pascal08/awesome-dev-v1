const Config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function(req, res) {

    const token = req.header("Authorization");

    if(!token) {
        return res.status(499).send({
            authorized: false,
            message: "No token provided."
        });
    }
    jwt.verify(token, Config.security.secret, (err, result) => {
        if(err) {
            res.status(498).send({
                authorized: false,
                message: err.message
            });
        } else {
            delete result.iat;
            delete result.exp;
            result.authorized = true;
            res.status(201).send(result);
        }
    });

};
