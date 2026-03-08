import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answerText: {
    type: String,
    required: true,
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const doubtSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  answers: [answerSchema],
}, { timestamps: true });

const Doubt = mongoose.model('Doubt', doubtSchema);
export default Doubt;
