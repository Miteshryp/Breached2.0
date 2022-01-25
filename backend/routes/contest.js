// imports
let express = require("express");
let router = express.Router();
let middleware = require("../middleware");

// controller
const controller = require("../controllers").contestController;

// routing
// router.get("/get", [middleware.auth.verifyAuth], controller.getContest);
router.get("/getActiveContest", [middleware.auth.verifyAuth], controller.getActiveContest);
// router.get("/getAllContest", [middleware.auth.verifyAuth], controller.getContestList);
// router.get("/getRegisteredContest", [middleware.auth.verifyAuth], controller.getRegisteredContest);
// router.get("/getLeaderboard", [middleware.auth.verifyAuth], controller.getLeaderboard); // returns the sorted list of user according to ranks
router.get("/getPoints", [middleware.auth.verifyAuth], controller.getSelfPoints);
router.get("/getRank", [middleware.auth.verifyAuth], controller.getSelfRank);
router.get("/question", [middleware.auth.verifyAuth], controller.getCurrentQuestion);
router.get("/getCurrentQuestion", [middleware.auth.verifyAuth], controller.getCurrentQuestion);

router.get("/getOverallLeaderboard", [middleware.auth.verifyAuth], controller.getOverallLeaderboard);

router.post("/register",[middleware.auth.verifyAuth], controller.registerInContest);
router.post("/submit", [middleware.auth.verifyAuth, middleware.redis.createRateLimiter(process.env.RATE_LIMIT_SUBMIT_PREFIX, process.env.RATE_LIMIT_SUBMIT)], controller.submission);

// admin services
router.post("/create", [middleware.auth.verifyAdminAuth], controller.createContest);

module.exports = router;