/* global requireSharedModel */
"use strict";

const Account       = requireSharedModel("account"),
    _             = require("lodash"),
    ObjectId      = require("promised-mongo").ObjectId;

module.exports = function(queu, sourceData) {
    _.each(sourceData, obj => {
        if (obj._id && obj._id.length === 24) {
            obj._id = ObjectId(obj._id);
        }
        const promise = Account.create(obj).then(data => {
            console.log(`Account '${data.email}' created.`);
        }).catch(error => {
            console.log(error);
        });

        queu.push(promise);
    });
}
