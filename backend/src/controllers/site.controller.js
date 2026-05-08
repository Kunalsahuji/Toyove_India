import SiteConfig from '../models/SiteConfig.js';
import Order from '../models/Order.js';
import asyncHandler from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

const ensureSiteConfig = async () => {
  let config = await SiteConfig.findOne({ key: 'default' });
  if (!config) {
    config = await SiteConfig.create({ key: 'default' });
  }
  return config;
};

const maskName = (value) => {
  if (!value) return 'Someone';
  const trimmed = String(value).trim();
  if (trimmed.length <= 1) return trimmed;
  return `${trimmed[0]}${'*'.repeat(Math.max(trimmed.length - 1, 1))}`;
};

export const getStorefrontSettings = asyncHandler(async (req, res) => {
  const config = await ensureSiteConfig();
  return successResponse(res, 200, 'Storefront settings fetched successfully', {
    announcementMessages: config.announcementMessages,
  });
});

export const updateStorefrontSettings = asyncHandler(async (req, res) => {
  const config = await ensureSiteConfig();
  config.announcementMessages = (req.body.announcementMessages || []).filter(Boolean);
  await config.save();
  return successResponse(res, 200, 'Storefront settings updated successfully', {
    announcementMessages: config.announcementMessages,
  });
});

export const getPurchasePopupSettings = asyncHandler(async (req, res) => {
  const config = await ensureSiteConfig();
  const orders = await Order.find({ paymentStatus: 'paid' }).sort({ createdAt: -1 }).limit(10);
  const activities = orders.map((order) => ({
    id: order._id.toString(),
    name: config.purchasePopup.maskNames ? maskName(order.customer.firstName) : order.customer.firstName,
    city: order.shippingAddress.city === 'Other' ? order.shippingAddress.district : order.shippingAddress.city,
    product: order.items?.[0]?.productName || 'Toy',
    image: order.items?.[0]?.image || '',
    status: 'Public',
    createdAt: order.createdAt,
  }));

  return successResponse(res, 200, 'Purchase popup settings fetched successfully', {
    settings: config.purchasePopup,
    activities,
  });
});

export const updatePurchasePopupSettings = asyncHandler(async (req, res) => {
  const config = await ensureSiteConfig();
  config.purchasePopup = {
    ...config.purchasePopup.toObject(),
    ...req.body,
  };
  await config.save();
  return successResponse(res, 200, 'Purchase popup settings updated successfully', config.purchasePopup);
});
