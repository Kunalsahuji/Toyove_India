import mongoose from 'mongoose';
import { createSlug } from '../utils/slug.js';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [120, 'Category name cannot exceed 120 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    index: true,
  },
  level: {
    type: Number,
    default: 0,
    min: 0,
    max: 3,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  bannerImage: {
    url: String,
    publicId: String,
    alt: String,
  },
  icon: {
    type: String,
    trim: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
    index: true,
  },
  showInNavbar: {
    type: Boolean,
    default: false,
    index: true,
  },
  showInAllCategories: {
    type: Boolean,
    default: true,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: [160, 'SEO title cannot exceed 160 characters'],
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: [220, 'SEO description cannot exceed 220 characters'],
  },
}, {
  timestamps: true,
});

categorySchema.pre('validate', function(next) {
  if (!this.slug && this.name) {
    this.slug = createSlug(this.name);
  }
  next();
});

categorySchema.pre('save', async function(next) {
  if (this.parentCategory) {
    const parent = await this.constructor.findById(this.parentCategory).select('level');
    this.level = parent ? parent.level + 1 : 0;
  } else {
    this.level = 0;
  }
  next();
});

categorySchema.index({ name: 'text', description: 'text' });
categorySchema.index({ parentCategory: 1, sortOrder: 1, name: 1 });

const Category = mongoose.model('Category', categorySchema);
export default Category;
