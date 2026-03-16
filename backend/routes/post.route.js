const express = require("express");
const controller = require("../controllers/post.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();
// CRUD đơn giản cho post
router.get("/", controller.getPosts);
router.post("/", upload.single("image"), controller.createPost);
router.put("/:id", upload.single("image"), controller.updatePost);
router.delete("/:id", controller.deletePost);

// search post theo keyword
router.get("/:keyword", controller.getPostByKeyword);

module.exports = router;