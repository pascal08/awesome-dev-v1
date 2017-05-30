/* global requireShared */

const Account = requireShared("models/account");

module.exports = function(req, res) {
    const accountId = req.params.accountId;

    Account.delete(accountId)
    .then(deletedAccount => {
        res.status(201);
        res.json(deletedAccount);
    })
      .catch(err => {
          res.status(406);
          res.json({errorType: err});
      });
};
