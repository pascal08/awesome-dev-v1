/* global requireValidator, it */

const assert = require("assert");
const hasEmail = requireValidator("object/hasEmail");

it('Notify the developer that the property "email" is missing on the req.body object', () => {
    const o = {email: undefined};
    return hasEmail(o)
  .catch(result => assert.equal("missingProperty", result.errorType));
});

it('Notify the developer that the value of the property "email" is invalid on the req.body object when it is ""', () => {
    const o = {email: ""};
    return hasEmail(o)
  .catch(result => assert.equal("invalidProperty", result.errorType));
});

it('Notify the developer that the value of the property "email" is invalid on the req.body object when it is "alice"', () => {
    const o = {email: "alice"};
    return hasEmail(o)
  .catch(result => assert.equal("invalidProperty", result.errorType));
});

it('Call next when the value of the property "email" contains a @ symbol', () => {
    const o = {email: "alice@bob.io"};
    return hasEmail(o)
  .then(result => assert.equal(true, result));
});
