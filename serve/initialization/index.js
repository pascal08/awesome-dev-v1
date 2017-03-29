/* global requireSharedUtility, Promise, requireAction*/
"use strict";

const CONFIG = require("config"),
    fs = require("fs"),
    _ = require("lodash"),
    db = requireSharedUtility("db");

global.requireAction = function(action) {
    return require(`./actions/${action}`);
};

global.requireDatamodel = function(modelName) {
    return require(`./../../data-models/${modelName}`);
};

global.requireModel = function(middleware) {
    return require(`./models/${middleware}`);
};

global.requireMiddleware = function(middleware) {
    return require(`./middleware/${middleware}`);
};

global.requireValidator = function(middleware) {
    return require(`./validators/${middleware}`);
};

global.requireUtility = function(middleware) {
    return require(`./utilities/${middleware}`);
};

const queu = _.slice(process.argv, 3);
if (queu.length < 1) {
    _.each(fs.readdirSync(CONFIG.init.directory), file => {
        if (file.indexOf(".json")) {
            queu.push(file.replace(".json", ""));
        }
    });
}

_.each(queu, collection => {
    const cData = JSON.parse(fs.readFileSync(`${CONFIG.init.directory}/${collection}.json`, "utf-8"));

    if (!cData.length) {
        return;
    }

    console.log(`Dropping collection '${collection}'`);
    db.get(collection).drop();

    requireAction(collection)(cData);
});

Promise.all(queu).then(() => {
    console.log("Database initialized");
    process.exit();
}).catch(error => {
    console.log(error);
    process.exit();
});
