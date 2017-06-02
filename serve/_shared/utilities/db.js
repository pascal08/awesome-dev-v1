const Config = require("config"),
    monk = require("monk");

module.exports = monk(Config.mongodb.database, err => {
    if(err){
        console.error("Not connected \r\n", err.message);
    }
});
