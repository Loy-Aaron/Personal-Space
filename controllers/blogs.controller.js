import Blog from '../models/blog.model.js';

export const getAllBlogs = async (req, res) => {
    try {
        const uid = req.user._id;
        const blogs = await Blog.find({ uid });

        res.status(200).json({ blogs });

    } catch (error) {
        console.error('Error in getting blogs', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createNewBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const uid = req.user._id;

        if (!title?.trim() || !content?.trim()) return res.status(400).json({ message: 'All fields are required' });

        const newBlog = new Blog({ title, content, uid });
        await newBlog.save();

        res.status(201).json({ newBlog });

    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).json({ message: 'Invalid datatype' });

        console.error('Error in creating new blog', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const uid = req.user._id;
        const { bid } = req.params;

        if (!title?.trim() || !content?.trim()) return res.status(400).json({ message: 'All fields are required' });

        const updatedBlog = await Blog.findOneAndUpdate({ _id: bid, uid }, { title, content }, { new: true });

        if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });

        res.status(200).json({ updatedBlog });

    } catch (error) {
        if (error.name === 'ValidationError') return res.status(400).json({ message: 'Invalid datatype' });

        console.error('Error in updating blog', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const uid = req.user._id;
        const { bid } = req.params;

        const deletedBlog = await Blog.findOneAndDelete({ _id: bid, uid });

        if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });

        res.status(200).json({ message: 'Blog deleted' });

    } catch (error) {
        console.error('Error in deleting blog', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAllBlogs = async (req, res) => {
    try {
        const uid = req.user._id;

        await Blog.deleteMany({ uid });

        res.status(200).json({ message: 'All blogs deleted' });

    } catch (error) {
        console.error('Error in deleting all blogs', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
