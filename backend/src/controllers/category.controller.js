import Category from '../models/Category.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { createSlug } from '../utils/slug.js';

const NAVBAR_LIMIT = 7;

const buildTree = (categories) => {
  const byId = new Map();
  const roots = [];

  categories.forEach(category => {
    const item = category.toObject ? category.toObject() : category;
    item.children = [];
    byId.set(String(item._id), item);
  });

  byId.forEach(category => {
    if (category.parentCategory && byId.has(String(category.parentCategory))) {
      byId.get(String(category.parentCategory)).children.push(category);
    } else {
      roots.push(category);
    }
  });

  return roots;
};

export const getNavbarCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    isActive: true,
    showInNavbar: true,
    parentCategory: null,
  })
    .sort({ sortOrder: 1, name: 1 })
    .limit(NAVBAR_LIMIT)
    .select('name slug bannerImage icon sortOrder');

  return successResponse(res, 200, 'Navbar categories', {
    categories,
    maxVisible: NAVBAR_LIMIT,
    allCategoriesUrl: '/all-categories',
  });
});

export const getCategoryTree = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    isActive: true,
    showInAllCategories: true,
  }).sort({ level: 1, sortOrder: 1, name: 1 });

  return successResponse(res, 200, 'Category tree', buildTree(categories));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    isActive: true,
    showInAllCategories: true,
  }).sort({ sortOrder: 1, name: 1 });

  return successResponse(res, 200, 'Categories fetched successfully', categories);
});

export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  const children = await Category.find({ parentCategory: category._id, isActive: true }).sort({ sortOrder: 1, name: 1 });
  return successResponse(res, 200, 'Category details', { ...category.toObject(), children });
});

export const adminListCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ level: 1, sortOrder: 1, name: 1 });
  return successResponse(res, 200, 'Admin categories', categories);
});

export const adminCreateCategory = asyncHandler(async (req, res, next) => {
  const payload = {
    ...req.body,
    slug: req.body.slug ? createSlug(req.body.slug) : createSlug(req.body.name),
  };

  if (payload.showInNavbar) {
    const navbarCount = await Category.countDocuments({ showInNavbar: true, isActive: true, parentCategory: null });
    if (navbarCount >= NAVBAR_LIMIT) {
      return next(new AppError(`Navbar can show only ${NAVBAR_LIMIT} categories`, 400));
    }
  }

  const category = await Category.create(payload);
  return successResponse(res, 201, 'Category created successfully', category);
});

export const adminUpdateCategory = asyncHandler(async (req, res, next) => {
  const payload = { ...req.body };
  if (payload.slug) payload.slug = createSlug(payload.slug);

  if (payload.showInNavbar === true) {
    const current = await Category.findById(req.params.id);
    const navbarCount = await Category.countDocuments({ showInNavbar: true, isActive: true, parentCategory: null, _id: { $ne: req.params.id } });
    if (!current?.showInNavbar && navbarCount >= NAVBAR_LIMIT) {
      return next(new AppError(`Navbar can show only ${NAVBAR_LIMIT} categories`, 400));
    }
  }

  const category = await Category.findByIdAndUpdate(req.params.id, payload, { returnDocument: 'after', runValidators: true });
  if (!category) return next(new AppError('Category not found', 404));

  return successResponse(res, 200, 'Category updated successfully', category);
});

export const adminDeleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false, showInNavbar: false },
    { returnDocument: 'after' }
  );
  if (!category) return next(new AppError('Category not found', 404));

  return successResponse(res, 200, 'Category archived successfully', category);
});

export const adminToggleNavbar = asyncHandler(async (req, res, next) => {
  if (req.body.showInNavbar) {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new AppError('Category not found', 404));
    if (category.parentCategory) return next(new AppError('Only top-level categories can be shown in navbar', 400));

    const navbarCount = await Category.countDocuments({ showInNavbar: true, isActive: true, parentCategory: null, _id: { $ne: req.params.id } });
    if (navbarCount >= NAVBAR_LIMIT) {
      return next(new AppError(`Navbar can show only ${NAVBAR_LIMIT} categories`, 400));
    }
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { showInNavbar: req.body.showInNavbar },
    { returnDocument: 'after', runValidators: true }
  );
  if (!category) return next(new AppError('Category not found', 404));

  return successResponse(res, 200, 'Navbar visibility updated', category);
});

export const adminReorderCategories = asyncHandler(async (req, res) => {
  await Promise.all(req.body.items.map(item => (
    Category.findByIdAndUpdate(item.id, { sortOrder: item.sortOrder })
  )));

  return successResponse(res, 200, 'Categories reordered successfully');
});
