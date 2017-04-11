/* global requireShared, requireApi */

const CONFIG = require("config");
const jwt = require("jsonwebtoken");
const Account = requireShared("models/account");

// Validators
const hasPassword = requireApi("validators/object/hasPassword");
const hasEmail = requireApi("validators/object/hasEmail");
const authByEmail = requireApi("validators/account/authByEmail");

module.exports = function(req, res) {
    const credentials = req.body;


    Promise.all([
        hasPassword(credentials),
        hasEmail(credentials),
        authByEmail(credentials)
    ])
  .then(() => {
      Account.getByEmail(credentials.email, credentials.password)
    .then(account => {

        const token = jwt.sign(account, CONFIG.security.secret, {
            expiresIn: CONFIG.security.tokenLife
        });

        return res.status(202).json({accessToken: token});
    })
    .catch(() => {
        res.status(500);
        res.json({errorCode: "databaseError"});
    });
  })
  .catch(err => {
      res.status(406);
      res.json(err);
  });
    return;
};
