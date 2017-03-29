"use strict";
const sent = require("./sent");

module.exports = (socket, req) => {
    socket.sent = sent(socket, req);
    return {
        socket: socket,
        req: req,
        add: function(routeName, fn) {
            this.socket.on( routeName, value => {
                fn(this.socket, this.req, value)
            });
            return this;
        }
    }
};
