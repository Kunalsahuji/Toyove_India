import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function getCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const categorySchema = new mongoose.Schema({ name: String, slug: String, showInNavbar: Boolean }, { collection: 'categories' });
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    const categories = await Category.find({});
    console.log(JSON.stringify(categories, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

getCategories();
