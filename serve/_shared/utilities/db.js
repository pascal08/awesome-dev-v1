const Config = require("config"),
    monk = require("monk");

module.exports = monk(Config.mongodb.database);
