import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDB } from '../config/db.js';
import Category from '../models/Category.js';
import logger from '../utils/logger.js';
import { createSlug } from '../utils/slug.js';

const topLevelCategories = [
  'Musical Toys',
  'Learning & Educational Toys',
  'Soft Toys',
  'Indoor & Outdoor Play',
  'Play Gyms & Playmats',
  'Sports & Games',
  'Role & Pretend Play Toys',
  'Blocks & Construction Sets',
  'Stacking Toys',
  'Kids Puzzles',
  'Baby Rattles',
  'Toys Cars Trains & Vehicles',
  'Dolls & Dollhouses',
  'Push & Pull Along Toys',
  'Art Crafts & Hobby Kits',
  'Action Figures & Collectibles',
  'Radio & Remote Control Toys',
  'Bath Toys',
  'Toys Guns & Weapons',
  'RIDE-ONS & SCOOTERS',
  'BOARD GAMES',
  'HOME PLAY ACTIVITIES',
];

const subcategoryMap = {
  'RIDE-ONS & SCOOTERS': [
    'Battery Operated Ride-ons',
    'Manual Push Ride-ons',
    'Swing cars/twisters',
    'Scooters',
    'Rocking Ride Ons',
    'Tricycles',
    'Bicycles',
    'Balance Bike',
  ],
  'BOARD GAMES': [
    'IQ Games',
    'Ludo, Snakes & Ladders',
    'Words, Pictures & Scrabble Games',
    'Playing Cards',
    'Life & Travel Board Games',
    'Animal, Birds & Marine Life Games',
    'Business/Monopoly',
  ],
  'HOME PLAY ACTIVITIES': [
    'Play Dough, Sand & Moulds',
    'Coloring, Sequencing & Engraving Art',
    'Activity Kit',
    'Building Construction Sets',
    'Multi Model Making Sets',
    'Kitchen Sets',
    'Play Foods',
    "Kids' Doctor Sets",
    'Piano & Keyboards',
    'Drum Sets & Percussion',
  ],
};

const navbarCategories = new Set([
  'Musical Toys',
  'Learning & Educational Toys',
  'Soft Toys',
  'Indoor & Outdoor Play',
  'RIDE-ONS & SCOOTERS',
  'BOARD GAMES',
]);

const upsertCategory = async ({ name, parentCategory = null, sortOrder = 0, showInNavbar = false }) => {
  const slug = createSlug(name);
  return Category.findOneAndUpdate(
    { slug },
    {
      $set: {
        name,
        parentCategory,
        sortOrder,
        showInNavbar: parentCategory ? false : showInNavbar,
        showInAllCategories: true,
        isActive: true,
        seoTitle: `${name} | Toyovo India`,
        seoDescription: `Shop ${name} at Toyovo India.`,
      },
    },
    { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
  );
};

const seedCategories = async () => {
  if (!env.MONGO_URI) {
    throw new Error('MONGO_URI is required to seed categories');
  }

  await connectDB();

  const parentByName = new Map();
  for (const [index, name] of topLevelCategories.entries()) {
    const parent = await upsertCategory({
      name,
      sortOrder: index + 1,
      showInNavbar: navbarCategories.has(name),
    });
    parentByName.set(name, parent);
  }

  for (const [parentName, children] of Object.entries(subcategoryMap)) {
    const parent = parentByName.get(parentName);
    for (const [index, childName] of children.entries()) {
      await upsertCategory({
        name: childName,
        parentCategory: parent._id,
        sortOrder: index + 1,
      });
    }
  }

  const total = await Category.countDocuments({ isActive: true });
  const navbarCount = await Category.countDocuments({ isActive: true, showInNavbar: true });
  logger.info(`Category seed completed. Active categories: ${total}. Navbar categories: ${navbarCount}.`);
};

seedCategories()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (error) => {
    logger.error(`Category seed failed: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  });
