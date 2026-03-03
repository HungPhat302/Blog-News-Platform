const Post = require("../models/Post.model");

exports.getPosts = async (_req, res) => {
    try {
        const posts = await Post.find().sort({ createAt: -1});
        return res.status(200).json({
            message: "Successfully to get posts",
            data: posts
        });
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.createPost = async (req, res) => {
    try {
        const { title, content, author} = req.body;

        if(!title && !content && !author) {
            res.status(400).json({
                message: "Doesn't have any data to create"
            });
        }

        const post = Post.create({
            title,
            content,
            author
        });

        res.status(200).json({
            message: "Create post successfully",
            data: post
        });
    } catch(error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!title && !content && !author) {
            return res.status(400).json({
                message: "Doesn't have any data to update"
            });
        }

        const post = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
                author
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post doesn't exist"
            });
        }

        return res.status(200).json({
            message: "Update post successfully",
            data: post
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        message: "Post doesn't exist"
      });
    }

    return res.status(200).json({
      message: "Delete post successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};