const express = require("express");
const controller = require("../controllers/post.controller");
const Post = require("../models/Post.model");

const router = express.Router();

// GET POSTS
router.get("/", controller.getPosts);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;