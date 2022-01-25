const jwt = require("jsonwebtoken");
const logger = require("node-color-log")

const secret = process.env.SECRET;

const User = require("./../models/participant")

async function verifyAuth(req, res, next) {
   let token = req.headers["x-access-token"];

   jwt.verify(token, secret, async function(err, data) {
      if(err) {
         logger.error("Token Authentication Failed.")
         return res
            .status(500)
            .send({message: "Authentication Failed", auth: false});
      }
         let user = await User.findOne({_id: data._id});
         if(!user)
            return res
               .status(500).
               send({message:"Auth failed. Failed to fetch updated user"});

         req.userData = {...user}._doc;
         next();
   });
}

// For admin usage (uploading question data)
function verifyAdminAuth(req, res, next) {
   let token = req.headers["x-access-token"];
   const adminSecret = process.env.ADMIN_SECRET;

   jwt.verify(token, adminSecret, function(err, data) {
      if(err) {
         logger.error(err);
         return res
            .status(500)
            .send({message: "Invalid Credentials", auth: false, admin: false});
      }
         req.userData = data;
         next();
   });
} 



module.exports = {verifyAuth, verifyAdminAuth};