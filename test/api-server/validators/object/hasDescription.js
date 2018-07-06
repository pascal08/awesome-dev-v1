/* global requireApi, it */

const assert = require("assert");
const hasDescription = requireApi("validators/object/hasDescription");

it('Notify the developer that the property "description" is missing on the req.body object', () => {
    const o = {description: undefined};
    return hasDescription(o)
  .catch(result => assert.equal("missingProperty", result.errorType));

});


it('Call next when the property "description" is set', () => {
    const o = {description: ""};
    return hasDescription(o)
  .then(result => assert.equal(true, result));
});
