import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Coupon title is required'],
    trim: true,
    maxlength: [160, 'Coupon title cannot exceed 160 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Coupon description cannot exceed 500 characters'],
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'shipping'],
    required: true,
  },
  scope: {
    type: String,
    enum: ['storewide', 'category', 'shipping'],
    default: 'storewide',
    index: true,
  },
  value: {
    type: Number,
    required: [true, 'Coupon value is required'],
    min: [0, 'Coupon value cannot be negative'],
  },
  minOrderValue: {
    type: Number,
    default: 0,
    min: [0, 'Minimum order value cannot be negative'],
  },
  maxDiscountAmount: {
    type: Number,
    min: [0, 'Maximum discount cannot be negative'],
  },
  applicableCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  usageLimit: {
    type: Number,
    min: [0, 'Usage limit cannot be negative'],
  },
  usedCount: {
    type: Number,
    default: 0,
    min: [0, 'Used count cannot be negative'],
  },
  status: {
    type: String,
    enum: ['active', 'paused'],
    default: 'active',
    index: true,
  },
  startsAt: Date,
  expiresAt: Date,
}, {
  timestamps: true,
});

couponSchema.index({ code: 1, status: 1 });

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
