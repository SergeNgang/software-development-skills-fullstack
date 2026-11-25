import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
    },
    email: {
      type: String,
      required: [true, 'Please add you email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);