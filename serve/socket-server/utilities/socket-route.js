"use strict";
const sent = require("./sent");

module.exports = (req, res) => {
    req.sent = sent(req, res);
    return {
        req: req,
        res: res,
        add: function(routeName, fn) {
            this.req.on( routeName, value => {
                this.req.body = value;
                fn(this.req, this.res);
            });
            return this;
        }
    }
};
