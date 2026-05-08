import mongoose from 'mongoose';

const shippingMethodSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  minDays: {
    type: Number,
    required: true,
    min: 0,
  },
  maxDays: {
    type: Number,
    required: true,
    min: 0,
  },
  charge: {
    type: Number,
    required: true,
    min: 0,
  },
  rule: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema);
export default ShippingMethod;
