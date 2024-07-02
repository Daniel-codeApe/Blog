import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    userId: {
        content: String,
        require:true,
    },
    postId: {
        type: String,
        require: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});

const Comment = mongoose.model('Comments', commentSchema);

export default Comment;