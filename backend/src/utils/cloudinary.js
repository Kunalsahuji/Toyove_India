import { v2 as cloudinary } from 'cloudinary';
import env from '../config/env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const isCloudinaryConfigured = () => Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET
);

export const uploadBufferToCloudinary = (buffer, options = {}) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: 'image',
      folder: options.folder || 'toyovoindia/products',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      transformation: [
        { fetch_format: 'auto' },
        { quality: 'auto' },
      ],
    },
    (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }
  );

  stream.end(buffer);
});

export default cloudinary;
