"use strict";

module.exports = (req, res, nsp) => {
    return {
        req: req,
        res: res,
        namespace: nsp,
        use: (name, fn) => {
            if (typeof this[name] !== "undefined") {
                return console.error("You can only set a property once");
            }
            req[name] = fn(req, res);
        },
        route: function(routeName, ...args) {
            let index = 0;
            const next = () => {
                if (typeof args[index] !== "function") {
                    return;
                }
                index++;
                args[index-1](this.req, this.res, next);
            };

            this.req.on( routeName, value => {
                this.req.body = value;
                index = 0;
                next();
            });
            return this;
        }
    }
};
