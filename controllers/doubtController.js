import Doubt from '../models/Doubt.js';

// @desc    Get all doubts
// @route   GET /api/doubts
// @access  Private
export const getDoubts = async (req, res) => {
  try {
    const doubts = await Doubt.find()
      .populate('askedBy', 'name role')
      .populate('answers.answeredBy', 'name role')
      .sort({ createdAt: -1 });
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Ask a new doubt
// @route   POST /api/doubts
// @access  Private (Student)
export const askDoubt = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const doubt = new Doubt({
      question,
      askedBy: req.user._id
    });
    
    // Auto-populate askedBy for immediate frontend render
    await doubt.save();
    const populatedDoubt = await Doubt.findById(doubt._id).populate('askedBy', 'name role');

    res.status(201).json(populatedDoubt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Answer a doubt
// @route   POST /api/doubts/:id/answer
// @access  Private
export const answerDoubt = async (req, res) => {
  const { answerText } = req.body;

  if (!answerText) {
    return res.status(400).json({ message: 'Answer text is required' });
  }

  try {
    const doubt = await Doubt.findById(req.params.id);

    if (!doubt) {
      return res.status(404).json({ message: 'Doubt not found' });
    }

    const newAnswer = {
      answerText,
      answeredBy: req.user._id,
      createdAt: Date.now()
    };

    doubt.answers.push(newAnswer);
    doubt.isResolved = true; // Mark resolved when someone answers
    await doubt.save();

    const updatedDoubt = await Doubt.findById(req.params.id)
      .populate('askedBy', 'name role')
      .populate('answers.answeredBy', 'name role');

    res.status(201).json(updatedDoubt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
