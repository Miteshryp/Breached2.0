const express = require("express");
const router = express.Router();
const controller = require("./../controllers").metaController;

router.get("/getContestDescription", controller.getContestDescription);
router.post("/setContestDescription", controller.setContestDescription);

module.exports = router;