/* global requireShared */

const signAccessToken = requireShared("utilities/signAccessToken");
// const signRefreshToken = requireShared("utilities/signRefreshToken");
const {pick} = require("lodash");


module.exports = (req, res) => {

    const user = pick(req.user, ["_id", "email", "name"]);

    if (req.session.redirectUrl) {
        const url = `${req.session.redirectUrl}?accessToken=${signAccessToken(user)}`;
        res.redirect(url);
    } else {
        res.status(202).send({
            accessToken: signAccessToken(user)
            // , refreshToken: signRefreshToken(user)
        });
    }

    delete req.session.redirectUrl;
    return;
}