import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

import authRoutes from './routes/authRoutes.js';
import questionsRoutes from './routes/questionsRoutes.js';
import resourcesRoutes from './routes/resourcesRoutes.js';
import successStoriesRoutes from './routes/successStoriesRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import doubtRoutes from './routes/doubtRoutes.js';

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/placement-hub')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/stories', successStoriesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doubts', doubtRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Placement Resource Hub API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
