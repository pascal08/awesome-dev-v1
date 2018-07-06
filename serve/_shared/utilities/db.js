const Config = require("config"),
    monk = require("monk");

module.exports = monk(Config.mongodb.database, err => {
    if(err){
        console.error("Not connected with Mongo database \r\n", err.message);
    }
});
