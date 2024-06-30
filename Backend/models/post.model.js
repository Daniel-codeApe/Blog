import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        unique: true,
    },
    content: {
        type: String,
        require: true,
        unique: true,
    },
    coverImage: {
        type: String, 
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBN9A0WIhvLIsTYp7XyPNAjsLE4HLKaxx23Q&s',
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;