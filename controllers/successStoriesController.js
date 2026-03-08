import SuccessStory from '../models/SuccessStory.js';

export const getStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().populate('postedBy', 'name').sort('-createdAt');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStory = async (req, res) => {
  try {
    const story = new SuccessStory({
      ...req.body,
      postedBy: req.user._id
    });
    const created = await story.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
