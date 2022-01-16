const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;
const adminSecret = process.env.ADMIN_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

const Participant = require("./../models/participant");
const logger = require("node-color-log");

exports.login = async (req,res) => {
   let {regNo, password} = req.body;
   let user = await Participant.findOne({regNo});

   if(!user)
      return res
         .status(500)
         .send({message: "User not found", auth: false});
   
   let checkPassword = await bcrypt.compare(password, user.password);

   if(!checkPassword) {
      return res
         .status(500)
         .send({message: "Incorrect Password", auth: false});
   }

   
   let token = jwt.sign({...user}._doc, secret);
   let response = {message: "Login Successful", auth: true, token};
   // if(adminCheck) response.admin = true;

   logger.info("Login Successful");
   logger.debug("User data: ");
   logger.debug({...user});
   
      return res
         .status(200)
         .send(response);
}


exports.adminLogin = async (req, res) => {
   let {regNo, password} = req.body;
   
   const adminRegNo = process.env.ADMIN_USERNAME;
   const adminPass = process.env.ADMIN_PASS;

   // admin login
   if(regNo !== adminRegNo)
      return res
         .status(500)
         .send({message: "Invalid username", auth: false});

   if(password !== adminPass) 
      return res
      .status(500)
      .send({message: "Invalid password", auth: false});

   let adminUserData = {
      regNo: adminRegNo,
      password: adminPass,
      admin: true
   }

   let token = jwt.sign(adminUserData, adminSecret)
   let response = {
      message: "Admin Login Successful",
      auth: true,
      admin: true,
      token
   }

   logger.info("Admin Login Successful");
   logger.debug(adminUserData);
   
   return res
      .status(200)
      .send(response);
}


exports.signup = async (req, res) => {
   let {name, email, regNo, password} = req.body;
   
   let checkArr = await Participant.findOne({regNo});
   if(checkArr)
      return res
         .status(500)
         .send({message: "Registration Number already used", auth: false});
   
   let hashedPass = await bcrypt.hash(password, saltRounds);

   let data = {
      name, email, regNo, password: hashedPass
   };
   
   let user = new Participant(data);
   user = await user.save();

   if(!user) {
      return res
         .status(500)
         .send({message: "Registration Failed: DB error", auth: false, fatal: true});
   }

   let token = jwt.sign({...user}._doc, secret);

   logger.info("Successfully Signed Up");
   logger.debug({...user});

   return res
      .status(200)
      .send({message: "Registration successful", auth: true, token});
}





exports.logout = async(req, res) => {
   return res.status(200).send({message: "Logout successful (save the token returned)", token: null});
}