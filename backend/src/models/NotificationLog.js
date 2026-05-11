import mongoose from 'mongoose';

const notificationLogSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  title: { type: String, required: true },
  body: { type: String, required: true },
  data: Object,
  tokens: [String],
  status: {
    type: String,
    enum: ['sent', 'failed', 'delivered', 'skipped'],
    default: 'sent'
  },
  platform: {
    type: String,
    enum: ['web', 'mobile', 'all'],
    default: 'web'
  },
  // Admin tracking fields
  category: {
    type: String,
    enum: ['Order', 'Payment', 'Return', 'Auth', 'Security', 'System', 'General'],
    default: 'General'
  },
  readByAdmin: {
    type: Boolean,
    default: false,
    index: true
  },
  adminActionUrl: String, // e.g. /admin/orders/:id
  userActionUrl: String,  // e.g. /account#orders
  orderNumber: String,    // quick reference for admin
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 * 30 // Auto-delete after 30 days
  }
}, {
  timestamps: true
});

const NotificationLog = mongoose.model('NotificationLog', notificationLogSchema);

export default NotificationLog;
