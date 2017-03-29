/* global requireShared requireDatamodel */

const _ = require("lodash"),
    moment = require("moment"),
    pass = requireShared("utilities/password"),
    db = requireShared("utilities/db"),
    accountModel = requireDatamodel("account"),
    ObjectId = require("promised-mongo").ObjectId,
    collection = db.get("accounts");

module.exports = {
    create: function(account) {

        const newAccount = _.merge({}, accountModel, account);
        if (typeof newAccount.password !== "string") {
            return new Promise((resolve, reject) => {
                reject("incorrectPasswordProperty");
            });
        }

        return new Promise((resolve, reject) => {
            collection.findOne({email: account.email})
      .then(result => {
          if (result === null) {
              newAccount.salt = pass.getSalt();
              newAccount.hashedPassword = pass.getHashedPass(newAccount.password, newAccount.salt);

          // IMPORTANT: Remove unhashed password
              delete newAccount.password;
              newAccount.created = moment.utc().unix();

          // Insert newAccount in database
              return collection.insert(newAccount).then(result => resolve(result));
          }
          return reject("accountAlreadyExists");
      })
      .catch(error => reject(error));

        });


    },
    delete: accountId => collection.remove(ObjectId(accountId)),
    getByEmail: (email, password) => new Promise((resolve, reject) => {
        collection.findOne({email: email})
                .then(account => {
                    if (!account) {
                        return reject("accountNotFound");
                    }

                    if (account.hashedPassword !== pass.getHashedPass(password, account.salt)) {
                        return reject("incorrectPassword");
                    }

                    delete account.salt;
                    delete account.hashedPassword;

                    return resolve(account);
                });
    })
};
