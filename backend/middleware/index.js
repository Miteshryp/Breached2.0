const auth = require("./auth");
const redis = require("./redis");

let middlewares = {auth, redis}

module.exports = middlewares;