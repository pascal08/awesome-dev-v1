/* global it, requireApi */

const {req, res, next} = require("../../../expressRoute");
const CONFIG = require("config");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const auth = requireApi("middleware/auth/index");
const account = {email: CONFIG.test.email};


it('Return "noToken" error when no token is provided', () => auth(req, res, next)
.catch(error => {
    assert.equal("noToken", error);
}));

it('Return "noCorrectToken" error when an incorrect token is provided', () => {
    req.body.token = `${jwt.sign(account, CONFIG.security.secret, {expiresIn: CONFIG.security.tokenLife})}incorrect`;
    return auth(req, res, next)
  .catch(error => {
      assert.equal("noCorrectToken", error);
  });
});

it("Return account object when the req.body.token is valid", () => {
    req.body.token = jwt.sign(account, CONFIG.security.secret, {expiresIn: CONFIG.security.tokenLife});

    return auth(req, res, next)
  .then(result => {
      assert.equal(true, typeof result === "object");
      assert.equal(true, result.email === account.email);
  });
});
