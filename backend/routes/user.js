// imports
const express = require("express");
const router = express.Router();

// controllers
const controller = require("../controllers").userController;

// routing
router.post("/login", controller.login);
router.post("/admin/login", controller.adminLogin);
router.post("/signup", controller.signup);
router.post("/logout", controller.logout);

module.exports = router;