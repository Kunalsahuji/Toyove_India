/**
 * FCM Test Script
 * 
 * Usage: node --env-file=.env scratch/test-fcm.js [userId]
 * 
 * This script:
 * 1. Connects to MongoDB
 * 2. Checks if a user has FCM tokens saved
 * 3. Sends a real push notification via FCM to that user
 */

import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

if (!FIREBASE_CONFIG) {
  console.error('❌ FIREBASE_CONFIG not found in .env');
  process.exit(1);
}

// ── Parse serviceAccount ──
let serviceAccount;
try {
  serviceAccount = JSON.parse(FIREBASE_CONFIG);
  console.log('✅ FIREBASE_CONFIG parsed successfully');
  console.log('   Project:', serviceAccount.project_id);
  console.log('   Client Email:', serviceAccount.client_email);
} catch (e) {
  console.error('❌ Failed to parse FIREBASE_CONFIG:', e.message);
  process.exit(1);
}

// ── Connect DB ──
await mongoose.connect(MONGO_URI);
console.log('✅ MongoDB connected');

// ── Load User model inline ──
const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  fcmTokens: [String],
  fcmTokenMobile: [String],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// ── Get target user ──
const targetEmail = process.argv[2] || null;
let user;

if (targetEmail) {
  user = await User.findOne({ email: targetEmail });
} else {
  // Find first user with FCM tokens
  user = await User.findOne({ $or: [{ fcmTokens: { $ne: [] } }, { fcmTokenMobile: { $ne: [] } }] });
}

if (!user) {
  console.log('\n⚠️  No user found with FCM tokens.');
  console.log('    Login to your account, go to Dashboard, and click "Get & Save FCM Token" first.\n');
  await mongoose.disconnect();
  process.exit(0);
}

console.log(`\n✅ Target User: ${user.email} (${user.firstName})`);
console.log(`   Web Tokens (${user.fcmTokens?.length || 0}):`, user.fcmTokens);
console.log(`   Mobile Tokens (${user.fcmTokenMobile?.length || 0}):`, user.fcmTokenMobile);

const allTokens = [...new Set([...(user.fcmTokens || []), ...(user.fcmTokenMobile || [])])].filter(Boolean);

if (allTokens.length === 0) {
  console.log('\n⚠️  User found but has no FCM tokens saved yet.');
  console.log('    Go to Dashboard → Click "Get & Save FCM Token" button first.\n');
  await mongoose.disconnect();
  process.exit(0);
}

console.log(`\n📤 Sending notification to ${allTokens.length} token(s)...`);

// ── Initialize Firebase Admin ──
const admin = await import('firebase-admin');
const { default: adminDefault } = admin;

adminDefault.initializeApp({
  credential: adminDefault.credential.cert(serviceAccount),
});

const messaging = adminDefault.messaging();

const response = await messaging.sendEachForMulticast({
  tokens: allTokens,
  notification: {
    title: '🎉 Toyovo India Test',
    body: 'FCM backend test successful! Your push notifications are working.',
  },
  data: {
    type: 'test',
    id: Date.now().toString(),
    notificationId: `test_${user._id}_${Date.now()}`,
    click_action: '/account',
  },
});

console.log('\n📊 FCM Send Result:');
console.log(`   ✅ Success: ${response.successCount}`);
console.log(`   ❌ Failed:  ${response.failureCount}`);

response.responses.forEach((res, i) => {
  if (res.success) {
    console.log(`   Token[${i}]: ✅ Delivered — messageId: ${res.messageId}`);
  } else {
    console.log(`   Token[${i}]: ❌ Failed — ${res.error?.code}: ${res.error?.message}`);
  }
});

await mongoose.disconnect();
console.log('\n✅ Done. Check your browser for the notification!');
