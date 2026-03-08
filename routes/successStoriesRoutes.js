import express from 'express';
import { getStories, createStory } from '../controllers/successStoriesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getStories);
router.post('/', protect, createStory);

export default router;
