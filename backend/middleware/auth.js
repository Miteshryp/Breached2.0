const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const logger = require("node-color-log")

function verifyAuth(req, res, next) {
   let token = req.headers["x-access-token"];

   jwt.verify(token, secret, function(err, data) {
      if(err)
         return res
            .status(500)
            .send({message: "Authentication Failed", auth: false});
         req.userData = data;
         next();
   });
}

// For admin usage (uploading question data)
function verifyAdminAuth(req, res, next) {
   let token = req.headers["x-access-token"];
   const adminSecret = process.env.ADMIN_SECRET;

   jwt.verify(token, adminSecret, function(err, data) {
      if(err)
         return res
            .status(500)
            .send({message: "Invalid Credentials", auth: false, admin: false});
      
         req.userData = data;
         next();
   });
} 

module.exports = {verifyAuth, verifyAdminAuth};