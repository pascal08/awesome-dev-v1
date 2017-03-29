/* global requireValidator, it */

const assert = require("assert");
const CONFIG = require("config");
const ObjectId = require("promised-mongo").ObjectId;
const hasAccountId = requireValidator("object/hasAccountId");

it('Notify the developer that the property "accountId" is missing in the object', () => {
    const o = {};
    return hasAccountId(o)
  .catch(result => assert.equal("missingProperty", result.errorType));
});

it('Notify the developer that there is no account with a matching accountId: "test"', () => {
    const o = {accountId: "test"};
    return hasAccountId(o)
  .catch(result => assert.equal("invalidValue", result.errorType));
});

it("Notify the developer that there is no account with a matching accountId: asdf-qwerty1", () => {
    const o = {accountId: ObjectId()};
    return hasAccountId(o)
  .catch(result => assert.equal("doesNotExists", result.errorType));
});

it("Return true when a correct account id is being used", () => {
    const o = {accountId: CONFIG.test._id};
    return hasAccountId(o)
  .then(result => assert.equal(true, result));
});
