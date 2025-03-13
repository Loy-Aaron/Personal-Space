import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    content: {
        type: String,
        required: true,
        trime: true,
        minLength: 1
    },
    uid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;