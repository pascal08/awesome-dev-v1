/* global  describe, it  */

global.requireShared = function(string) {
    return require(`${__dirname}/../serve/_shared/${string}`);
};

global.requireSocket = function(path) {
    return require(`${__dirname}/../serve/socket-server/${path}`);
}

global.requireDatamodel = function(modelName) {
    return require(`${__dirname}/../data-models/${modelName}`);
};

requireShared("requireApiServer");

const CONFIG = require("config");
const assert = require("assert");
const account = requireShared("models/account");
const importTest = (name, path) => {
    describe(name, () => {
        require(path);
    });
};

//
// describe("Shared", () => {
//     describe("Models", () => {
//         importTest("account", "./_shared/models/account");
//
//     });
// });
//
// describe("API Server", () => {
//     describe("Middleware", () => {
//         describe("Auth", () => {
//             importTest("self", "./api-server/middleware/auth/self");
//             importTest("index", "./api-server/middleware/auth");
//         });
//     });
//
//     describe("Validators", () => {
//         describe("Object", () => {
//             importTest("hasEmail", "./api-server/validators/object/hasEmail");
//             importTest("hasDescription", "./api-server/validators/object/hasDescription");
//             importTest("hasName", "./api-server/validators/object/hasName");
//             importTest("hasPassword", "./api-server/validators/object/hasPassword");
//             importTest("hasAccountId", "./api-server/validators/object/hasAccountId");
//         });
//         describe("Account", () => {
//             importTest("authByEmail", "./api-server/validators/account/authByEmail");
//             importTest("doesExists", "./api-server/validators/account/doesExists");
//             importTest("doesNotExists", "./api-server/validators/account/doesNotExists");
//         });
//     });
// });

describe("Socket Server", () => {
    importTest("examples", "./socket-server/examples");

});

// describe("Delete test account", () => {
//     it("Clean up the Database, by removing the test account", () => account.getByEmail(CONFIG.test.email, CONFIG.test.password).then(result => account.delete(result._id).then(result => {
//         assert.equal(true, typeof result === "object");
//     })));
// });


