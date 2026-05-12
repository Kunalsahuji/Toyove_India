import PageContent from '../models/PageContent.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get a page by slug
 * @route   GET /api/pages/:slug
 * @access  Public
 */
export const getPageBySlug = asyncHandler(async (req, res, next) => {
  const page = await PageContent.findOne({ slug: req.params.slug });
  
  if (!page) {
    return next(new AppError('Page not found', 404));
  }

  return successResponse(res, 200, 'Page fetched successfully', page);
});

/**
 * @desc    Get all pages (Admin only)
 * @route   GET /api/admin/pages
 * @access  Private/Admin
 */
export const adminListPages = asyncHandler(async (req, res) => {
  const pages = await PageContent.find().sort({ title: 1 });
  return successResponse(res, 200, 'Pages fetched successfully', pages);
});

/**
 * @desc    Create or Update a page content (Admin only)
 * @route   POST /api/admin/pages
 * @access  Private/Admin
 */
export const adminUpsertPage = asyncHandler(async (req, res) => {
  const { slug, title, content } = req.body;

  const page = await PageContent.findOneAndUpdate(
    { slug },
    { 
      title, 
      content, 
      lastUpdatedBy: req.user._id 
    },
    { 
      new: true, 
      upsert: true, 
      runValidators: true 
    }
  );

  return successResponse(res, 200, 'Page updated successfully', page);
});
