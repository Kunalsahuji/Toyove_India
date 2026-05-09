import multer from 'multer';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { successResponse } from '../utils/apiResponse.js';
import { isCloudinaryConfigured, uploadBufferToCloudinary } from '../utils/cloudinary.js';

export const adminMediaUpload = asyncHandler(async (req, res, next) => {
  if (!isCloudinaryConfigured()) {
    return next(new AppError('Cloudinary is not configured on the server', 500));
  }

  if (!req.file?.buffer) {
    return next(new AppError('Image file is required', 400));
  }

  const folder = String(req.body.folder || 'products')
    .trim()
    .replace(/[^a-zA-Z0-9/_-]/g, '')
    .replace(/^\/+|\/+$/g, '');

  const result = await uploadBufferToCloudinary(req.file.buffer, {
    folder: `toyovoindia/${folder || 'products'}`,
  });

  return successResponse(res, 201, 'Media uploaded successfully', {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    format: result.format,
    originalFilename: req.file.originalname,
  });
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype?.startsWith('image/')) {
    cb(new AppError('Only image uploads are allowed', 400));
    return;
  }
  cb(null, true);
};

export const adminMediaUploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
}).single('file');
