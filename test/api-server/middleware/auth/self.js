/* global it, requireApi */

const {req, res, next} = require("../../../expressRoute");
const assert = require("assert");
const authSelf = requireApi("middleware/auth/self");


it("Return false, whenever the req.accessToken._id not matches req.params.userId", () => {
    req.accessToken = {
        _id: 1
    };
    req.params = {
        userId: 2
    };
    assert.equal(false, authSelf(req, res, next));
});


it("Return true, when the req.accessToken._id matches req.params.userId", () => {
    req.accessToken = {
        _id: 1
    };
    req.params = {
        userId: 1
    };

    assert.equal(true, authSelf(req, res, next));
});
