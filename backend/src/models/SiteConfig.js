import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'default',
  },
  announcementMessages: {
    type: [String],
    default: [
      'Free Shipping On Orders Over ₹999!',
      '10% off your next order, use code : TOYOVOINDIA001',
      'New arrivals every week - shop now',
    ],
  },
  purchasePopup: {
    enabled: {
      type: Boolean,
      default: true,
    },
    initialDelaySeconds: {
      type: Number,
      default: 60,
      min: 0,
      max: 600,
    },
    repeatDelaySeconds: {
      type: Number,
      default: 120,
      min: 30,
      max: 3600,
    },
    visibleDurationSeconds: {
      type: Number,
      default: 10,
      min: 5,
      max: 60,
    },
    maskNames: {
      type: Boolean,
      default: true,
    },
  },
}, { timestamps: true });

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
export default SiteConfig;
