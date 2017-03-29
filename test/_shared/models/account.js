/* global describe, it, requireShared, requireDatamodel */

// const {req, res, next}  = require('../../expressRoute');
const CONFIG = require("config");
const assert = require("assert");
const account = requireShared("models/account");
const accountModel = requireDatamodel("account");


describe("Create", () => {
    it('Return "incorrectPasswordProperty" when there is no password property set', () => {
        accountModel.password = undefined;

        return account.create(accountModel)
    .catch(error => {
        assert.equal("incorrectPasswordProperty", error);
    });
    });

    it("Return object when the account is successfully created", () => {
        accountModel.email = CONFIG.test.email;
        accountModel.password = CONFIG.test.password;

        return account.create(accountModel)
    .then(result => {
        assert.equal(true, typeof result === "object");
        assert.equal(true, result.email === accountModel.email);
        assert.equal(true, typeof result.hashedPassword === "string");
            // Add testaccount id to global variable CONFIG
        CONFIG.test._id = result._id;
    });
    });

    it('Return "accountAlreadyExists" when trying to create an account which email is already present in the database', () => {
        accountModel.email = CONFIG.test.email;
        accountModel.password = CONFIG.test.password;

        return account.create(accountModel)
    .catch(error => {
        assert.equal("accountAlreadyExists", error);
    });
    });
});

describe("Get by email", () => {

    it('Return "accountNotFound" when there is no account available matching this email', () => {
        accountModel.email = `${CONFIG.test.email}wrong`;

        return account.getByEmail(accountModel.email)
    .catch(error => {
        assert.equal("accountNotFound", error);
    });
    });

    it('Return "incorrectPassword" when there is an incorrect password set', () => {
        accountModel.email = CONFIG.test.email;
        accountModel.password = `${CONFIG.test.password}wrong`;

        return account.getByEmail(accountModel.email, accountModel.password)
    .catch(error => {
        assert.equal("incorrectPassword", error);
    });
    });

    it("Return account object when the right credentials are used", () => {
        accountModel.email = CONFIG.test.email;
        accountModel.password = CONFIG.test.password;

        return account.getByEmail(accountModel.email, accountModel.password)
    .then(result => {
        assert.equal(true, typeof result === "object");
        assert.equal(true, result.email === accountModel.email);
    });
    });

});
