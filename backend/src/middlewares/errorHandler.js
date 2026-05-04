import env from '../config/env.js';
import logger from '../utils/logger.js';
import { errorResponse } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  if (env.NODE_ENV === 'development') {
    logger.error(`Error: ${error.message}\nStack: ${err.stack}`);
  } else {
    logger.error(`Error: ${error.message}`);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 400);
  }

  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || err.message || 'Server Error';

  return errorResponse(res, statusCode, message, undefined, req.id);
};
