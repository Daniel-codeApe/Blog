import { errorHandler } from "../utils/error.js"
import Post from "../models/post.model.js"

export const createPost = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'you cannot post a blog without title or content'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-z0-9A-Z-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            savedPost,
        });
    } catch (error) {
        next(error);
    }
}