'use strict';

global.requireShared = function(string) {
    return require(`${__dirname}/serve/_shared/` + string);
}

global.requireSocket = function(path) {
    return require(`${__dirname}/serve/socket-server/${path}`);
}

global.requireDatamodel = function(modelName) {
    return require(`${__dirname}/data-models/` + modelName);
}

const _ = require('lodash');

const applicationMapping = {
    'init': './serve/initialization',
    'socket-server': './serve/socket-server',
    'api-server': './serve/api-server'
}

let application = null;
console.log("A:",process.env.NODE_PATH);
if (typeof process.argv[2] != 'undefined') {
    application = process.argv[2].toLowerCase();
    process.env.NODE_PATH = applicationMapping[application];
    require(applicationMapping[application]);
} else {
    let options = [];
    _.each(applicationMapping, (value, key) => {
        options.push(key);
    })
    return console.error('Please add one of the following properties to run the corresponding script:\r\n', options);
}
