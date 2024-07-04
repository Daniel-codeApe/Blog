import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const {content, userId, postId} = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to post comment"));
        }
        const newComment = new Comment({
            content,
            userId,
            postId,
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}

export const getComments = async (req, res, next) => {
    try {
        const foundComments = await Comment.find({postId: req.params.postId}).sort({createdAt: -1});

        res.status(200).json(foundComments);
    } catch (error) {
        next(error);
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const commentToBeUpdated = await Comment.findById(req.params.commentId);
        if (!commentToBeUpdated) {
            return next(errorHandler(404, "Comment doesn't exist"));
        } 
        if (req.user.id !== commentToBeUpdated.userId) {
            return next(errorHandler(403, "Only the creator of this comment can edit it"));
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content
            },
            {new: true}
        );

        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const commentToBeDeleted = await Comment.findById(req.params.commentId);
        if (!commentToBeDeleted) {
            return next(errorHandler(404, "Comment doesn't exist"));
        }
        if (req.user.id !== commentToBeDeleted.commentId) {
            return next(errorHandler(403, "Only the creator of this comment can delete it"));
        }

        await Comment.findByIdAndDelete(commentToBeDeleted._id);
        res.status(200).json("Comment deleted");
    } catch (error) {
        next(error);
    }
}

export const likeComment = async (req, res, next) => {
    try {
        const likedComment = await Comment.findById(req.params.commentId);
        if (!likedComment) {
            return next(errorHandler(404, "Comment doesn't exist"));
        }

        const userIndex = likedComment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            likedComment.numberOfLikes += 1;
            likedComment.likes.push(req.user.id);
        } else {
            likedComment.numberOfLikes -= 1;
            likedComment.likes.splice(userIndex, 1);
        }

        await likedComment.save();
        res.status(200).json(likedComment);
    } catch (error) {
        next(error);
    }
}