const crypto = require("crypto");

module.exports = {
    getSalt: () => crypto.randomBytes(128).toString("base64"),
    getHashedPass: (pass, salt) => crypto.createHmac("sha512", salt).update(pass).digest("base64")
};