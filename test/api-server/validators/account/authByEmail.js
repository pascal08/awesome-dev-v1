/* global requireApi, it */

const CONFIG = require("config");
const assert = require("assert");
const authByEmail = requireApi("validators/account/authByEmail");

it(`Authentication is not successfull, because the account with email "${CONFIG.test.email}wrongasfdkjnasdfkjadfnskjafdnskjafdsnkjanfs" does not exist`, () => {
    const account = {
        email: `${CONFIG.test.email}wrongasfdkjnasdfkjadfnskjafdnskjafdsnkjanfs`,
        password: CONFIG.test.password
    };

    return authByEmail(account)
  .catch(result => {
      assert.equal(result.errorType, "incorrectCredentials");
  });
});

it(`Authentication is not successfull, because the credentials are wrong. req.body = {email: ${CONFIG.test.email}, password: ${CONFIG.test.password}wrong}`, () => {
    const account = {
        email: CONFIG.test.email,
        password: `${CONFIG.test.password}wrong`
    };

    return authByEmail(account)
  .catch(result => {
      assert.equal(result.errorType, "incorrectCredentials");
  });
});


it(`Authentication is successfull with req.body = {email: ${CONFIG.test.email}, password: ${CONFIG.test.password}}`, () => {
    const account = {
        email: CONFIG.test.email,
        password: CONFIG.test.password
    };

    return authByEmail(account)
  .then(result => {
      assert.equal(true, result);
  });
});
