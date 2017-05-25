/* global requireShared */

const signToken = requireShared("utilities/signToken");


module.exports = (req, res) => {
    if (req.session.redirectUrl) {
        const url = `${req.session.redirectUrl}?accessToken=${signToken(req.user)}`;
        res.redirect(url);
    } else {
        res.status(202).send({accessToken: signToken(req.user)});
    }

    delete req.session.redirectUrl;
    return;
}