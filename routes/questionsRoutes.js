import express from 'express';
import {
  getQuestions, createQuestion, getPendingQuestions,
  approveQuestion, upvoteQuestion, addComment, getCompanies
} from '../controllers/questionsController.js';
import { protect, mentorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getQuestions);
router.post('/', protect, createQuestion);
router.get('/pending', protect, mentorOrAdmin, getPendingQuestions);
router.put('/:id/approve', protect, mentorOrAdmin, approveQuestion);
router.put('/:id/upvote', protect, upvoteQuestion);
router.post('/:id/comments', protect, addComment);
router.get('/companies', protect, getCompanies);

export default router;
