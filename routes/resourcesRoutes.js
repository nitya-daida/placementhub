import express from 'express';
import {
  getResources, createResource, getPendingResources,
  approveResource, upvoteResource
} from '../controllers/resourcesController.js';
import { protect, mentorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getResources);
router.post('/', protect, createResource);
router.get('/pending', protect, mentorOrAdmin, getPendingResources);
router.put('/:id/approve', protect, mentorOrAdmin, approveResource);
router.put('/:id/upvote', protect, upvoteResource);

export default router;
