import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
