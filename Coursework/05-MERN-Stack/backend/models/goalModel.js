import mongoose from 'mongoose';
const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please insert a Text'],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Goal', goalSchema);