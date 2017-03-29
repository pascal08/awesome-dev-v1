
global.requireController = controller => require(`${__dirname}/../api-server/controllers/${controller}`);

global.requireModel = model => require(`${__dirname}/../api-server/models/${model}`);

global.requireMiddleware = middleware => require(`${__dirname}/../api-server/middleware/${middleware}`);

global.requireValidator = validator => require(`${__dirname}/../api-server/validators/${validator}`);
