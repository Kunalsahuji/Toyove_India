import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to a product.'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user.'],
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Review comment cannot be empty.'],
    trim: true,
  },
  role: {
    type: String,
    default: 'Customer',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { 
  timestamps: true 
});

// Calculate average rating for product after saving a review
reviewSchema.post('save', async function() {
  const stats = await this.constructor.aggregate([
    { $match: { product: this.product, status: 'approved' } },
    { $group: { _id: '$product', nRating: { $sum: 1 }, avgRating: { $avg: '$rating' } } }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(this.product, {
      ratingAverage: stats[0].avgRating.toFixed(1),
      ratingCount: stats[0].nRating,
      reviewCount: stats[0].nRating
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
