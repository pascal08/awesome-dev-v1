const CONFIG = require("config"),
    monk = require("monk");

module.exports = monk(CONFIG.mongodb.database);
