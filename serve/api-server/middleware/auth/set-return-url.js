"use strict";

module.exports = (req, res, next) => {
    if (req.query.redirectUrl) {
        req.session.redirectUrl = `${req.query.redirectUrl}`;
    }
    next();
}