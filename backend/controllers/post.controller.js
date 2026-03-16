// Chưa đủ API

/* 
1. Lấy danh sách bài viết publish
2. Chi tiết bài post
3. Lấy danh sách bài viết theo category
4. Lấy danh sách bài viết theo tag
*/

const Post = require("../models/Post.model");

// Lấy tất cả bài posts
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
//tạo 
// Tạo post mới
exports.createPost = async (req, res) => {
    try {

        const { title, content, slug, category, tags, author} = req.body;

        // const slugified = slug || title.toLowerCase().replace(/\s+/g, "-");    Tạo slug

        const imageurl = req.file ? req.file.path : null;

        if(!title && !content && !author) {
            res.status(400).json({
                message: "Doesn't have any data to create"
            });
        }

        const post = await Post.create({
            title,
            content,
            slug,
            category,
            tags,
            author,
            image: imageurl
        });

        console.log("Post created");

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

//Chỉnh sửa post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, content, category, tags, author } = req.body;
        let image;

        if (tags) {
            if (!Array.isArray(tags)) {
                tags = [tags];
            }
        }

        const updateData = {
            title,
            content,
            category,
            tags,
            author
        };

        if (req.file) {
            image = req.file;
            updateData.image = req.file.path;
        }

        if (!title && !content && !author && !category && !image) {
            return res.status(400).json({
                message: "Doesn't have any data to update"
            });
        }

        const post = await Post.findByIdAndUpdate(
            id,
            updateData,
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

// Xóa post
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

// Search post theo keyword
exports.getPostByKeyword = async (req, res) => {
    try {
        const { keyword } = req.params;
        const keywordRegex = new RegExp(keyword);
        const posts =  await Post.find({ title: keywordRegex});

        // Validate
        if(!keyword) {
            return res.status(400).json({
                message: "Bad request"
            });
        }

        return res.status(200).json({
            message: "Successfully",
            data: posts
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};