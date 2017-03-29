/* global requireShared, requireValidator */

const Account = requireShared("models/account");


// Validators
const hasPassword = requireValidator("object/hasPassword");
const hasEmail = requireValidator("object/hasEmail");
const doesNotExists = requireValidator("account/doesNotExists");


module.exports = function(req, res) {

    const newAccount = req.body;
    console.log("req.body", req.body);
    Promise.all([
        hasPassword(newAccount),
        hasEmail(newAccount),
        doesNotExists(newAccount)
    ])
  .then(() => {
      Account.create(newAccount)
    .then(storedAccount => {
        delete storedAccount.hashedPassword;
        delete storedAccount.salt;

        res.status(201);
        res.json(storedAccount);
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
};
