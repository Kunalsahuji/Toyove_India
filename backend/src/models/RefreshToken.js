import mongoose from 'mongoose';
import crypto from 'crypto';
import env from '../config/env.js';
import { parseDurationToMs } from '../utils/duration.js';

const refreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  tokenHash: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  familyId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  revokedAt: {
    type: Date,
  },
  replacedByTokenHash: {
    type: String,
  },
  createdByIp: {
    type: String,
  },
  userAgent: {
    type: String,
  }
}, {
  timestamps: true,
});

// TTL Index to automatically remove expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Helper to create a record standardized across controllers
refreshTokenSchema.statics.createTokenRecord = async function(userId, tokenHash, req, familyId = null) {
  const expiresInMs = parseDurationToMs(env.JWT_REFRESH_EXPIRES_IN || '7d');
  
  return await this.create({
    user: userId,
    tokenHash: tokenHash,
    familyId: familyId || crypto.randomUUID(),
    expiresAt: new Date(Date.now() + expiresInMs),
    createdByIp: req.ip,
    userAgent: req.headers['user-agent']
  });
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
