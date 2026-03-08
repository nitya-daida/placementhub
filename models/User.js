import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String },
  branch: { type: String },
  year: { type: Number },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'placed_student', 'mentor', 'admin'],
    default: 'student'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
