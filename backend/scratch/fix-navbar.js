import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from '../src/models/Category.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function fixNavbar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // In categories ko navbar se hatana hai
    const toRemove = ['Musical Toys', 'Learning & Educational Toys'];

    const result = await Category.updateMany(
      { name: { $in: toRemove } },
      { $set: { showInNavbar: false } }
    );

    console.log(`✅ Fixed! ${result.modifiedCount} extra categories removed from Navbar.`);
    console.log('🔄 Restarting your app will show the clean Navbar now.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  }
}

fixNavbar();
