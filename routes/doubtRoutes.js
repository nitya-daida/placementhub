import express from 'express';
import { getDoubts, askDoubt, answerDoubt } from '../controllers/doubtController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getDoubts)
  .post(protect, askDoubt);

router.post('/:id/answer', protect, answerDoubt);

export default router;
