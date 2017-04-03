"use strict";

module.exports = socket => ({
    // Helper function to check if the user is logged in, should be called in any function which broadcasts an emit.
    validateConnection: (command, data) => {
        if (!socket.user) {
            socket.emit("user.retry", {
                command,
                data
            });
            return false;
        }
        return true;
    }
});


