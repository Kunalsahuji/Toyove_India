import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function findUsersWithTokens() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Minimal user schema to find tokens
    const userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      fcmTokens: [String],
      fcmTokenMobile: [String]
    }, { collection: 'users' });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    const users = await User.find({
      $or: [
        { fcmTokens: { $exists: true, $ne: [] } },
        { fcmTokenMobile: { $exists: true, $ne: [] } }
      ]
    });

    if (users.length === 0) {
      console.log('No users found with FCM tokens. Please log in to the frontend first.');
    } else {
      console.log(`Found ${users.length} users with tokens:`);
      users.forEach(u => {
        console.log(`- ${u.firstName} ${u.lastName} (${u.email}) | Web Tokens: ${u.fcmTokens?.length || 0} | Mobile Tokens: ${u.fcmTokenMobile?.length || 0}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

findUsersWithTokens();
