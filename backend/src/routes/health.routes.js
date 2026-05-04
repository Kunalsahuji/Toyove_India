import express from 'express';
import mongoose from 'mongoose';
import env from '../config/env.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const router = express.Router();

router.get('/', (req, res) => {
  const data = {
    status: 'ok',
    env: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    requestId: req.id
  };
  return successResponse(res, 200, 'Health check passed', data);
});

router.get('/db', (req, res) => {
  const state = mongoose.connection.readyState;
  const status = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };
  
  const data = {
    readyState: state,
    state: status[state] || 'unknown'
  };

  if (state === 1) {
    data.host = mongoose.connection.host;
    data.name = mongoose.connection.name;
    return successResponse(res, 200, 'Database is connected', data);
  }
  return errorResponse(res, 503, 'Database is not connected', undefined, req.id);
});

export default router;
