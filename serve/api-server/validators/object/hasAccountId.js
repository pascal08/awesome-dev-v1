/* global requireShared */

const db = requireShared("utilities/db");
const ObjectId = require("promised-mongo").ObjectId;
const collection = db.get("accounts");


module.exports = obj => new Promise((resolve, reject) => {
    if (typeof obj.accountId === "undefined") {
        return reject({errorType: "missingProperty", properties: {property: "accountId"}});
    }

    if (typeof obj.accountId === "string" && obj.accountId.length !== 24) {
        return reject({errorType: "invalidValue", properties: {property: "accountId"}});
    }

    return collection.findOne({_id: ObjectId(obj.accountId)})
    .then(result => {
        if(result === null) {
            return reject(reject({errorType: "doesNotExists", properties: {property: "accountId", value: obj.accountId}}));
        }
        return resolve(true);
    })
    .catch(() => reject(reject({errorType: "internalServerError"})));
});

