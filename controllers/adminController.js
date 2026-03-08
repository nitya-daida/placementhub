import User from '../models/User.js';
import Question from '../models/Question.js';
import Resource from '../models/Resource.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = req.body.role || user.role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const studentsCount = await User.countDocuments({ role: 'student' });
    const mentorsCount = await User.countDocuments({ role: 'mentor' });
    
    const totalQuestions = await Question.countDocuments();
    const approvedQuestions = await Question.countDocuments({ status: 'approved' });
    const pendingQuestions = await Question.countDocuments({ status: 'pending' });

    const totalResources = await Resource.countDocuments();
    
    // Most popular companies (aggregation)
    const companyStats = await Question.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$companyName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      users: { total: totalUsers, students: studentsCount, mentors: mentorsCount },
      questions: { total: totalQuestions, approved: approvedQuestions, pending: pendingQuestions },
      resources: { total: totalResources },
      topCompanies: companyStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
