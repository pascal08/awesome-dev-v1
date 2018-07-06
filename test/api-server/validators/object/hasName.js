/* global requireApi, it */

const assert = require("assert");
const hasName = requireApi("validators/object/hasName");

it('Notify the developer that the property "name" is missing on the req.body object', () => {
    const o = {name: undefined};
    return hasName(o)
  .catch(result => assert.equal("missingProperty", result.errorType));
});

it('Call next when the property "name" is set', () => {
    const o = {name: ""};
    return hasName(o)
  .then(result => console.log(">>dx>", result));
});
