import express from 'express';
import { getUsers, updateUserRole, getAnalytics } from '../controllers/adminController.js';
import { protect, admin, mentorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, admin, getUsers);
router.put('/users/:id/role', protect, mentorOrAdmin, updateUserRole);
router.get('/analytics', protect, admin, getAnalytics);

export default router;
