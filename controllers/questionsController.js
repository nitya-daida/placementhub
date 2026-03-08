import Question from '../models/Question.js';

export const getQuestions = async (req, res) => {
  try {
    const filter = { status: 'approved' };
    if (req.query.company) filter.companyName = new RegExp(req.query.company, 'i');
    if (req.query.role) filter.role = new RegExp(req.query.role, 'i');
    if (req.query.year) filter.year = req.query.year;
    if (req.query.roundType) filter.roundType = req.query.roundType;
    if (req.query.search) {
      filter.$or = [
        { companyName: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') }
      ];
    }
    const questions = await Question.find(filter).populate('postedBy', 'name').sort('-createdAt');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = new Question({
      ...req.body,
      postedBy: req.user._id,
      status: req.user.role === 'mentor' || req.user.role === 'admin' ? 'approved' : 'pending'
    });
    const created = await question.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPendingQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ status: 'pending' }).populate('postedBy', 'name');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      question.status = 'approved';
      const updatedQuestion = await question.save();
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upvoteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (question.upvotes.includes(req.user._id)) {
      question.upvotes = question.upvotes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      question.upvotes.push(req.user._id);
    }
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    question.comments.push({
      text: req.body.text,
      postedBy: req.user._id
    });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Question.distinct('companyName');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
