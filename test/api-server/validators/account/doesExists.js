/* global requireApi, it */

const assert = require("assert");
const CONFIG = require("config");
const doesExists = requireApi("validators/account/doesExists");

it(`Return string "doesNotExists", since the following account does not exists req.body = {email: "${CONFIG.test.email} wrong"}`, () => {
    const account = {
        email: `${CONFIG.test.email}wrong`
    };

    return doesExists(account)
  .catch(result => {
      assert.equal("doesNotExists", result.errorType);
  });
});

it("Return true, when the testaccount exists", () => {
    const account = {
        email: CONFIG.test.email
    };

    return doesExists(account)
  .then(result => {
      assert.equal(true, result);
  });
});
