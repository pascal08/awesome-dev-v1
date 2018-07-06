module.exports = obj => new Promise((resolve, reject) => {
    if (typeof obj.description === "undefined") {
        return reject({errorType: "missingProperty", properties: {property: "description"}});
    }
    return resolve(true);
});
