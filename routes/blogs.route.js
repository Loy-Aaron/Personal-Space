import { Router } from 'express';
import {createNewBlog, deleteAllBlogs, deleteBlog, getAllBlogs, updateBlog} from '../controllers/blogs.controller.js'
const blogsRoutes = Router();

blogsRoutes.get('/', getAllBlogs);
blogsRoutes.post('/', createNewBlog);
blogsRoutes.put('/:bid', updateBlog);
blogsRoutes.delete('/:bid', deleteBlog);
blogsRoutes.delete('/', deleteAllBlogs);

export default blogsRoutes;