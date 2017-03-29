module.exports = obj => new Promise((resolve, reject) => {

    if (!obj.password) {
        return reject({errorType: "missingProperty", properties: {property: "password"}});
    }
    return resolve(true);

});
