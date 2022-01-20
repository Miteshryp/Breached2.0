// imports
let express = require("express");
let router = express.Router();
let middleware = require("../middleware");

// controller
const controller = require("../controllers").contestController;

// routing
// router.get("/get", [middleware.verifyAuth], controller.getContest);
router.get("/getActiveContest", [middleware.verifyAuth], controller.getActiveContest);
// router.get("/getAllContest", [middleware.verifyAuth], controller.getContestList);
// router.get("/getRegisteredContest", [middleware.verifyAuth], controller.getRegisteredContest);
// router.get("/getLeaderboard", [middleware.verifyAuth], controller.getLeaderboard); // returns the sorted list of user according to ranks
router.get("/getPoints", [middleware.verifyAuth], controller.getSelfPoints);
router.get("/getRank", [middleware.verifyAuth], controller.getSelfRank);
router.get("/question", [middleware.verifyAuth], controller.getCurrentQuestion);
router.get("/getCurrentQuestion", [middleware.verifyAuth], controller.getCurrentQuestion);

router.get("/getOverallLeaderboard", [middleware.verifyAuth], controller.getOverallLeaderboard);

router.post("/register",[middleware.verifyAuth], controller.registerInContest);
router.post("/submit", [middleware.verifyAuth], controller.submission);

// admin services
router.post("/create", [middleware.verifyAdminAuth], controller.createContest);

module.exports = router;