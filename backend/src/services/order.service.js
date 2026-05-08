import Coupon from '../models/Coupon.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';
import { getValidatedCouponResult } from './coupon.service.js';

export const SHIPPING_RATES = {
  standard: 15,
  express: 45,
};

export const resolveOrderProduct = async (item) => {
  if (item.productId) {
    const productById = await Product.findOne({ _id: item.productId, status: 'active' }).populate('category', 'slug');
    if (productById) {
      return productById;
    }
  }

  if (item.slug) {
    return Product.findOne({ slug: item.slug, status: 'active' }).populate('category', 'slug');
  }

  return null;
};

export const buildOrderDraftFromCheckout = async (checkoutInput) => {
  const resolvedItems = await Promise.all(checkoutInput.items.map(async (item) => {
    const product = await resolveOrderProduct(item);
    if (!product) {
      throw new AppError('One or more products in your cart are unavailable', 400);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} is low on stock. Please reduce quantity and try again.`, 400);
    }

    return {
      product,
      quantity: item.quantity,
    };
  }));

  const items = resolvedItems.map(({ product, quantity }) => ({
    product: product._id,
    productName: product.name,
    productSlug: product.slug,
    sku: product.sku,
    image: product.thumbnail?.url || product.images?.[0]?.url || '',
    categorySlug: product.category?.slug || '',
    quantity,
    unitPrice: product.price,
    totalPrice: Number((product.price * quantity).toFixed(2)),
  }));

  const subtotal = Number(items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2));
  const shippingAmount = SHIPPING_RATES[checkoutInput.shippingMethod] ?? SHIPPING_RATES.standard;

  let discountAmount = 0;
  let couponData;

  if (checkoutInput.couponCode) {
    const couponResult = await getValidatedCouponResult({
      code: checkoutInput.couponCode,
      subtotal,
      shippingAmount,
      categorySlugs: [...new Set(items.map((item) => item.categorySlug).filter(Boolean))],
    });

    discountAmount = couponResult.discountAmount;
    couponData = {
      code: couponResult.coupon.code,
      couponId: couponResult.coupon._id,
      title: couponResult.coupon.title,
      type: couponResult.coupon.type,
    };
  }

  const totalAmount = Number(Math.max(subtotal + shippingAmount - discountAmount, 0).toFixed(2));

  return {
    items,
    subtotal,
    shippingAmount,
    discountAmount,
    totalAmount,
    couponData,
    resolvedItems,
  };
};

export const applyFulfilledOrderSideEffects = async ({ resolvedItems, couponData }) => {
  await Promise.all(resolvedItems.map(({ product, quantity }) => Product.updateOne(
    { _id: product._id },
    {
      $inc: {
        stock: -quantity,
        soldCount: quantity,
      },
    }
  )));

  if (couponData?.couponId) {
    await Coupon.updateOne({ _id: couponData.couponId }, { $inc: { usedCount: 1 } });
  }
};

export const revertFulfilledOrderSideEffects = async ({ items, couponData }) => {
  await Promise.all((items || []).map((item) => Product.updateOne(
    { _id: item.product },
    {
      $inc: {
        stock: item.quantity,
        soldCount: -item.quantity,
      },
    }
  )));

  if (couponData?.couponId) {
    await Coupon.updateOne(
      { _id: couponData.couponId, usedCount: { $gt: 0 } },
      { $inc: { usedCount: -1 } }
    );
  }
};
