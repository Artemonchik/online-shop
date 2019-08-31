function checkObjFields(obj, message, ...arr) {
    for (let field of arr) {
        if (!(obj && obj.hasOwnProperty(field))) {
            const err = new Error(message);
            err.status = 400;
            err.expose = true;
            throw err;
        }
    }
}

module.exports = {
    checkObjFields,
};