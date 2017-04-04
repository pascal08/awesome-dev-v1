"use strict";
const sent = require("./sent");

module.exports = (req, res) => {
    req.sent = sent(req, res);
    return {
        req: req,
        res: res,
        add: function(routeName, ...args) {
            let index = 0;
            const next = () => {
                if (typeof args[index] !== "function") {
                    return;
                }
                index++;
                args[index-1](this.req, this.res, next);
            };


            // console.log(this.req.on);
            this.req.on( routeName, value => {
                this.req.body = value;
                index = 0;
                next();
            });
            return this;
        }
    }
};
