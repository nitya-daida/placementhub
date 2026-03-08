import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  branch: { type: String, required: true },
  company: { type: String, required: true },
  preparationTimeline: { type: String, required: true },
  dailyRoutine: { type: String },
  resourcesUsed: { type: String },
  mistakes: { type: String },
  tips: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('SuccessStory', successStorySchema);
