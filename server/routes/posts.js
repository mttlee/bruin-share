import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, getSpecificPosts, getSubjects, getClasses } from '../controllers/posts.js';

const router = express.Router();

router.get('/subjects', getSubjects);
router.get('/:subjectId/classes', getClasses);
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

router.get('/:subjectId/:classId', getSpecificPosts);

export default router;