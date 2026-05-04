import Product from '../models/Product.js';
import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { createSlug } from '../utils/slug.js';

const sortMap = {
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  'alpha-asc': { name: 1 },
  'alpha-desc': { name: -1 },
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  'best-selling': { soldCount: -1, ratingAverage: -1 },
  relevance: { isFeatured: -1, createdAt: -1 },
};

const resolveCategoryId = async (slug) => {
  if (!slug) return undefined;
  const category = await Category.findOne({ slug, isActive: true }).select('_id');
  return category?._id;
};

const buildProductFilter = async (query, publicOnly = true) => {
  const filter = {};
  if (publicOnly) filter.status = 'active';

  const categoryId = await resolveCategoryId(query.category);
  if (categoryId) filter.category = categoryId;

  const subcategoryId = await resolveCategoryId(query.subcategory);
  if (subcategoryId) filter.subcategories = subcategoryId;

  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, 'i') },
      { description: new RegExp(query.search, 'i') },
      { brand: new RegExp(query.search, 'i') },
      { tags: new RegExp(query.search, 'i') },
    ];
  }
  if (query.brand) filter.brand = query.brand;
  if (query.ageGroup) filter.ageGroup = query.ageGroup;
  if (query.gender) filter.gender = query.gender;
  if (query.material) filter.material = query.material;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filter.price = {};
    if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
    if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
  }

  return filter;
};

export const listProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 12;
  const skip = (page - 1) * limit;
  const filter = await buildProductFilter(req.query, true);
  const sort = sortMap[req.query.sort || 'relevance'] || sortMap.relevance;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .populate('subcategories', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return successResponse(res, 200, 'Products fetched successfully', products, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

export const getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug, status: 'active' })
    .populate('category', 'name slug')
    .populate('subcategories', 'name slug');

  if (!product) return next(new AppError('Product not found', 404));

  return successResponse(res, 200, 'Product details', product);
});

export const listFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: 'active', isFeatured: true }).sort({ createdAt: -1 }).limit(12);
  return successResponse(res, 200, 'Featured products', products);
});

export const listTrendingProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: 'active', isTrending: true }).sort({ soldCount: -1, createdAt: -1 }).limit(12);
  return successResponse(res, 200, 'Trending products', products);
});

export const listNewArrivals = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: 'active', isNewArrival: true }).sort({ createdAt: -1 }).limit(12);
  return successResponse(res, 200, 'New arrival products', products);
});

export const listBestSellers = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: 'active', isBestSeller: true }).sort({ soldCount: -1 }).limit(12);
  return successResponse(res, 200, 'Best seller products', products);
});

export const adminListProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Math.min(Number(req.query.limit || 20), 60);
  const skip = (page - 1) * limit;
  const filter = await buildProductFilter(req.query, false);
  if (req.query.status) filter.status = req.query.status;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .populate('subcategories', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return successResponse(res, 200, 'Admin products', products, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
});

export const adminCreateProduct = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    slug: req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.name),
  };
  const product = await Product.create(payload);
  return successResponse(res, 201, 'Product created successfully', product);
});

export const adminGetProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('subcategories', 'name slug');
  if (!product) return next(new AppError('Product not found', 404));
  return successResponse(res, 200, 'Admin product details', product);
});

export const adminUpdateProduct = asyncHandler(async (req, res, next) => {
  const payload = { ...req.body };
  if (payload.slug) payload.slug = createSlug(payload.slug);

  const product = await Product.findByIdAndUpdate(req.params.id, payload, { returnDocument: 'after', runValidators: true });
  if (!product) return next(new AppError('Product not found', 404));

  return successResponse(res, 200, 'Product updated successfully', product);
});

export const adminDeleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { status: 'archived' }, { returnDocument: 'after' });
  if (!product) return next(new AppError('Product not found', 404));

  return successResponse(res, 200, 'Product archived successfully', product);
});

export const adminUpdateProductStatus = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { status: req.body.status }, { returnDocument: 'after', runValidators: true });
  if (!product) return next(new AppError('Product not found', 404));

  return successResponse(res, 200, 'Product status updated successfully', product);
});

export const adminUpdateProductStock = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      stock: req.body.stock,
      ...(req.body.lowStockThreshold !== undefined && { lowStockThreshold: req.body.lowStockThreshold }),
    },
    { returnDocument: 'after', runValidators: true }
  );
  if (!product) return next(new AppError('Product not found', 404));

  return successResponse(res, 200, 'Product stock updated successfully', product);
});
