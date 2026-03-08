import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: Number, required: true },
  roundType: {
    type: String,
    enum: ['Aptitude', 'Technical', 'Coding', 'HR'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: { type: String, required: true },
  tips: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  comments: [{
    text: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
