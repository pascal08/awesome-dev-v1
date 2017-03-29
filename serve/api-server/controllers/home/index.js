module.exports = function(req, res, next) {
    res.status(200).send("Api server running.");
    next();
};
