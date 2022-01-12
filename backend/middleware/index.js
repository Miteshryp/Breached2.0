let auth = require("./auth");

let middlewares = {
   verifyAuth: auth.verifyAuth,
   verifyAdminAuth: auth.verifyAdminAuth
}

module.exports = middlewares;