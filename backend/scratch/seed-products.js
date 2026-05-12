import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const PRICES = [299, 399, 499, 599, 699, 799, 899, 999, 1299, 1499, 1599, 1999];
const AGE_GROUPS = ['0-6 Months', '6-12 Months', '1-2 Years', '2-4 Years', '4-6 Years', '6-10 Years'];

// Helper to generate relevant product names based on category name
const getRelevantProducts = (catName) => {
  const name = catName.toLowerCase();
  if (name.includes('musical')) return ['Electronic Guitar', 'Baby Piano', 'Drum Set', 'Musical Xylophone', 'Microphone Toy', 'Rhythm Shakers', 'Trumpet Toy', 'Accordion', 'Violin Kit', 'Harp Toy', 'Flute', 'Bell Set'];
  if (name.includes('learning') || name.includes('educational')) return ['Alphabet Blocks', 'Counting Abacus', 'Solar System Kit', 'Flash Cards Set', 'Shape Sorter', 'Interactive Globe', 'Spelling Game', 'Clock Learning Toy', 'Human Body Model', 'Microscope Kit', 'Number Puzzle', 'Logic Pad'];
  if (name.includes('soft') || name.includes('plush')) return ['Giant Teddy Bear', 'Soft Bunny Plush', 'Panda Cuddle Toy', 'Elephant Pillow', 'Unicorn Soft Toy', 'Lion King Plush', 'Dinosaur Plush', 'Cat Soft Toy', 'Puppy Plush', 'Monkey Cuddler', 'Penguin Softie', 'Koala Plush'];
  if (name.includes('ride-on') || name.includes('scooter')) return ['Electric Bike', 'Push Scooter', 'Balance Bike', 'Tricycle', 'Rocking Horse', 'Swing Car', 'Manual Ride-on', 'Foldable Scooter', 'Battery Jeep', 'Skateboard', 'Roller Skates', 'Pedal Go-Kart'];
  if (name.includes('clothing')) return ['Cotton Onesie', 'Summer Frock', 'Denim Jacket', 'Active Tracksuit', 'Formal Shirt', 'Cozy Hoodie', 'Party Wear Gown', 'Joggers Set', 'T-Shirt Pack', 'Nightsuit', 'Sweater', 'Romper'];
  if (name.includes('jewellery') || name.includes('accessories')) return ['Charm Bracelet', 'Hair Clip Set', 'Stylish Sunglasses', 'Cute Backpack', 'Digital Watch', 'Butterfly Necklace', 'Winter Mittens', 'Floral Headband', 'Waist Belt', 'Cartoon Umbrella', 'Earrings Set', 'Ring Set'];
  if (name.includes('home') || name.includes('living')) return ['Baby Crib Set', 'Nursery Lamp', 'Toy Storage Bin', 'Alphabet Floor Mat', 'Height Chart', 'High Chair', 'Bath Mat', 'Kids Bookshelf', 'Stars Projector', 'Study Table', 'Wall Stickers', 'Cushion Set'];
  if (name.includes('toy') || name.includes('play')) return ['Remote Control Car', 'Building Blocks', 'Doctor Set', 'Kitchen Set', 'Musical Piano', 'Action Figure', 'Soft Squeaky Toy', 'Train Set', 'Robot Toy', 'Bubble Machine', 'Police Car', 'Fire Truck'];
  
  // Default generic products if category doesn't match
  return [`Premium ${catName} Item 1`, `Premium ${catName} Item 2`, `Premium ${catName} Item 3`, `Premium ${catName} Item 4`, `Premium ${catName} Item 5`, `Premium ${catName} Item 6`, `Premium ${catName} Item 7`, `Premium ${catName} Item 8`, `Premium ${catName} Item 9`, `Premium ${catName} Item 10`, `Premium ${catName} Item 11`, `Premium ${catName} Item 12` ];
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Fetch ALL existing categories from the DB
    const existingCategories = await Category.find({ isActive: true });
    
    if (existingCategories.length === 0) {
      console.log('⚠️ No active categories found in database. Please add categories first.');
      process.exit(0);
    }

    console.log(`📂 Found ${existingCategories.length} active categories in database.`);

    // 2. Loop through each category and add 12 products
    for (const category of existingCategories) {
      console.log(`\n📦 Seeding products for: ${category.name}...`);
      
      const productNames = getRelevantProducts(category.name);

      for (let i = 0; i < productNames.length; i++) {
        const name = productNames[i];
        const price = PRICES[Math.floor(Math.random() * PRICES.length)];
        const ageGroup = AGE_GROUPS[Math.floor(Math.random() * AGE_GROUPS.length)];
        
        // Dynamic unique image based on category name and index
        const imageUrl = `https://images.unsplash.com/photo-${1515488764276 + i + (category.name.length * 10)}?auto=format&fit=crop&q=80&w=800`;

        const productData = {
          name: name,
          description: `${name} is a top-quality item from our ${category.name} collection. It is designed to be safe, durable, and fun for kids. Made with premium materials, this ${name.toLowerCase()} is perfect for daily use or as a special gift.`,
          shortDescription: `High-quality ${name} for kids and babies.`,
          category: category._id,
          brand: 'Toyovo Premium',
          price: price,
          oldPrice: price + Math.floor(Math.random() * 500) + 100,
          stock: Math.floor(Math.random() * 100) + 10,
          status: 'active',
          ageGroup: ageGroup,
          gender: category.name.includes('Boy') ? 'Boy' : (category.name.includes('Girl') ? 'Girl' : 'Unisex'),
          material: 'Safe & Durable Materials',
          isFeatured: i < 3,
          images: [{ url: imageUrl, alt: name }],
          thumbnail: { url: imageUrl, alt: name }
        };

        const existing = await Product.findOne({ name: name, category: category._id });
        if (!existing) {
          await Product.create(productData);
          process.stdout.write('✅');
        } else {
          process.stdout.write('⏭️');
        }
      }
    }

    console.log('\n\n✨ SEEDING COMPLETE! Products added to all your existing categories.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
