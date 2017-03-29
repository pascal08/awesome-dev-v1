/* global requireValidator, it */

const assert = require("assert");
const hasPassword = requireValidator("object/hasPassword");

it('Notify the developer that the property "password" is missing on the req.body object', () => {
    const o = {password: undefined};
    return hasPassword(o)
  .catch(result => assert.equal("missingProperty", result.errorType));
});

it('Call next when the property "password" is set', () => {
    const o = {password: "randomString"};
    return hasPassword(o)
  .then(result => assert.equal(true, result));
});
