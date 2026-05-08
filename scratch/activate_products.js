import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not found in .env');
  process.exit(1);
}

const productSchema = new mongoose.Schema({
  status: { type: String, default: 'draft' }
}, { strict: false });

const Product = mongoose.model('Product', productSchema);

async function activateProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const result = await Product.updateMany(
      { status: { $ne: 'active' } },
      { $set: { status: 'active' } }
    );

    console.log(`Successfully activated ${result.modifiedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error activating products:', error);
    process.exit(1);
  }
}

activateProducts();
