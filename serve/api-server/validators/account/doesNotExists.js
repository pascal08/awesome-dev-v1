/* global requireShared */

const db = requireShared("utilities/db");
const collection = db.get("accounts");

module.exports = account => new Promise((resolve, reject) => {
    collection.findOne({email: account.email})
    .then(result => {
        if (result !== null) {
            return reject({errorType: "alreadyExists", properties: {property: "account", value: account.email}});
        }
        return resolve(true);

    })
    .catch(() => reject({errorType: "internalServerError"}));
});


