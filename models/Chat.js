import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
