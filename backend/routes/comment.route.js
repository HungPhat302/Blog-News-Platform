const express = require("express");
const controller = require("../controllers/comment.controller");

const router = express.Router();

router.get("/:postid", controller.getAllComment);
router.post("/", controller.createComment);
router.put("/:commentid", controller.updateComment);
router.delete("/:commentid", controller.deleteComment);

module.exports = router;