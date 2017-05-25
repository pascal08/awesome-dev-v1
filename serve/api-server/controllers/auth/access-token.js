/* global requireShared */

const signToken = requireShared("utilities/signToken");
const {pick} = require("lodash");


module.exports = (req, res) => {

    const user = pick(req.user, ["_id", "email", "name"]);

    if (req.session.redirectUrl) {
        const url = `${req.session.redirectUrl}?accessToken=${signToken(user)}`;
        res.redirect(url);
    } else {
        res.status(202).send({accessToken: signToken(user)});
    }

    delete req.session.redirectUrl;
    return;
}