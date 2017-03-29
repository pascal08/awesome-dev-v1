module.exports = obj => new Promise((resolve, reject) => {
    if (typeof obj.email === "undefined") {
        return reject({errorType: "missingProperty", properties: {property: "email"}});

    } else if (obj.email.indexOf("@") === -1) {
        return reject({errorType: "invalidProperty", properties: {property: "email"}});
    }
    return resolve(true);

});
