import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkNotificationLogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const NotificationLog = mongoose.model('NotificationLog', new mongoose.Schema({
      title: String,
      status: String,
      createdAt: Date
    }, { collection: 'notificationlogs' }));

    const recentLogs = await NotificationLog.find().sort({ createdAt: -1 }).limit(5);
    
    console.log('--- RECENT NOTIFICATION LOGS ---');
    recentLogs.forEach(log => {
      console.log(`[${log.createdAt.toISOString()}] ${log.title} | Status: ${log.status}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkNotificationLogs();
