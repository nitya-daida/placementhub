import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const filter = { status: 'approved' };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') }
      ];
    }
    const resources = await Resource.find(filter).populate('uploadedBy', 'name').sort('-createdAt');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createResource = async (req, res) => {
  try {
    const resource = new Resource({
      ...req.body,
      uploadedBy: req.user._id,
      status: req.user.role === 'mentor' || req.user.role === 'admin' ? 'approved' : 'pending'
    });
    const created = await resource.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPendingResources = async (req, res) => {
  try {
    const resources = await Resource.find({ status: 'pending' }).populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      resource.status = 'approved';
      const updatedResource = await resource.save();
      res.json(updatedResource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upvoteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    if (resource.upvotes.includes(req.user._id)) {
      resource.upvotes = resource.upvotes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      resource.upvotes.push(req.user._id);
    }
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
