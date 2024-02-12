import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  changeStatus
} from '../controllers/blogs.controller.js';

const router = Router();

router.get('/blogs', getBlogs)

router.get('/blogs/:id', getBlog)

router.post('/blogs', createBlog)

router.patch('/blogs/:id', updateBlog)

// router.patch('/blog/:id', changeStatus)

export default router;
