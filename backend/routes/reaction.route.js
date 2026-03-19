const express = require("express");
const controller = require("../controllers/reaction.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", controller.createReaction);
router.delete("/:commentid", verifyToken, controller.deleteReaction);

module.exports = router;