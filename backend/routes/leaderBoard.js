// imports
let express = require("express");
let router = express.Router();
let verifyAuth = require("./../middleware").verifyAuth;

// controller
const controller = require("./../controllers").contestController;

// routing
router.get("/getLeaderboard", [verifyAuth], controller.getLeaderboard); // returns the sorted list of user according to ranks
router.get("/getPoints", [verifyAuth], controller.getSelfPoints);
router.get("/getRank", [verifyAuth], controller.getSelfRank);

router.post("/submit", [verifyAuth], controller.submission);

router.post("/create", [verifyAdminAuth], controller.createContest);

module.exports = router;