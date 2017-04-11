"use strict";

module.exports = (socket, res, nsp) => {
    return {
        socket: socket,
        res: res,
        namespace: nsp,
        use: (name, fn) => {
            if (typeof this[name] !== "undefined") {
                return console.error("You can only set a property once");
            }
            socket[name] = fn(socket, res, nsp);
        },
        route: function(routeName, ...args) {
            let index = 0;
            const next = () => {
                if (typeof args[index] !== "function") {
                    return;
                }
                index++;
                args[index-1](this.socket, this.res, next);
            };

            this.socket.on( routeName, value => {
                this.socket.body = value;
                index = 0;
                next();
            });
            return this;
        }
    }
};
