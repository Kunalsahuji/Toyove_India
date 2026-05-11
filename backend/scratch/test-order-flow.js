import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { 
  notifyOrderPlaced, 
  notifyPaymentSuccess, 
  notifyOrderStatusChanged, 
  notifyOrderCancelled 
} from '../src/services/notification.service.js';
import Order from '../src/models/Order.js';
import User from '../src/models/User.js';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function runOrderFlowTest() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find a test user (ideally one who has logged in recently)
    const user = await User.findOne({ 
      $or: [
        { fcmTokens: { $exists: true, $ne: [] } },
        { fcmTokenMobile: { $exists: true, $ne: [] } }
      ]
    }).sort({ updatedAt: -1 });

    if (!user) {
      console.error('❌ No users with FCM tokens found. Please log in to the app first!');
      process.exit(1);
    }

    console.log(`🚀 Starting test for user: ${user.firstName} (${user.email})`);

    // Create a mock order object
    const mockOrder = {
      _id: new mongoose.Types.ObjectId(),
      orderNumber: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      user: user._id,
      customer: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      totalAmount: 1499,
      status: 'processing'
    };

    console.log(`\n--- Step 1: Order Placed ---`);
    await notifyOrderPlaced(mockOrder);
    console.log('✅ Order placed notification triggered');

    await new Promise(r => setTimeout(r, 3000)); // wait 3s

    console.log(`\n--- Step 2: Payment Success ---`);
    await notifyPaymentSuccess(mockOrder);
    console.log('✅ Payment success notification triggered');

    await new Promise(r => setTimeout(r, 3000));

    console.log(`\n--- Step 3: Status Changed to Shipped ---`);
    mockOrder.status = 'shipped';
    mockOrder.trackingNumber = 'TOYOVO123456';
    await notifyOrderStatusChanged(mockOrder, 'processing');
    console.log('✅ Status change notification triggered');

    await new Promise(r => setTimeout(r, 3000));

    console.log(`\n--- Step 4: Order Cancelled ---`);
    mockOrder.status = 'cancelled';
    await notifyOrderCancelled(mockOrder);
    console.log('✅ Cancellation notification triggered');

    console.log('\n✨ Test flow complete! Check your browser for notifications.');
    console.log('Check the "NotificationLogs" collection in MongoDB to verify delivery status.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

runOrderFlowTest();
