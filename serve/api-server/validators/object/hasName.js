module.exports = obj => new Promise((resolve, reject) => {
    if (typeof obj.name === "undefined") {
        return reject({errorType: "missingProperty", properties: {property: "name"}});
    }
    return resolve(true);

});
