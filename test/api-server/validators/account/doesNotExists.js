/* global requireValidator, it */

const assert = require("assert");
const CONFIG = require("config");
const doesNotExists = requireValidator("account/doesNotExists");

it('Return "alreadyExists" error when the test account exists', () => {
    const account = {
        email: CONFIG.test.email
    };

    return doesNotExists(account)
  .catch(result => {
      assert.equal("alreadyExists", result.errorType);
  });
});

it(`Return true, when checking an invalid email address like "${CONFIG.test.email} wrong"`, () => {
    const account = {
        email: `${CONFIG.test.email}wrong`
    };

    return doesNotExists(account)
  .then(result => {
      assert.equal(true, result);
  });
});
