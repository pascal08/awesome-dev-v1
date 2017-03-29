'use strict';

global.requireShared = function(string) {
    return require(`${__dirname}/serve/_shared/` + string);
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

if (typeof process.argv[2] != 'undefined') {
    application = process.argv[2].toLowerCase();
    require(applicationMapping[application]);
} else {
    let options = [];
    _.each(applicationMapping, (value, key) => {
        options.push(key);
    })
    return console.error('Please add one of the following properties to run the corresponding script:\r\n', options);
}
