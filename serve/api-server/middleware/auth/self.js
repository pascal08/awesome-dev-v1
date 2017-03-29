"use strict";

module.exports = function(req, res, next) {

    // decode token
    if (req.accessToken._id == req.params.userId) {
        next();
        return true;
    } else {
        // if someone else tries to get your messages
        // return an error
        res.status(403).send("You are not allowed to get data of this user.");
        return false;
    }
}
