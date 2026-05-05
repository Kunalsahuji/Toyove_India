import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDB } from '../config/db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import logger from '../utils/logger.js';
import { createSlug } from '../utils/slug.js';

const products = [
  {
    name: 'Playbox The Builder Wooden Toys',
    sku: 'TOY-WOOD-001',
    categorySlug: 'blocks-and-construction-sets',
    price: 1249,
    oldPrice: 1699,
    stock: 120,
    brand: 'Toykio',
    ageGroup: '2-4 Years',
    material: 'Wood',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533',
    flags: { isFeatured: true, isTrending: true, isBestSeller: true },
  },
  {
    name: 'KidsKraze Creative Soft Bunny',
    sku: 'TOY-SOFT-002',
    categorySlug: 'soft-toys',
    price: 899,
    oldPrice: 1199,
    stock: 80,
    brand: 'Babyhug',
    ageGroup: '0-2 Years',
    material: 'Cotton',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533',
    flags: { isFeatured: true, isNewArrival: true },
  },
  {
    name: 'Learning Kit Pro Alphabet Set',
    sku: 'TOY-EDU-003',
    categorySlug: 'learning-and-educational-toys',
    price: 1499,
    oldPrice: 1899,
    stock: 64,
    brand: 'Toyovo',
    ageGroup: '4-6 Years',
    material: 'Plastic',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-05.jpg?v=1710995380&width=533',
    flags: { isFeatured: true, isTrending: true },
  },
  {
    name: 'Classic Pull Along Toy Car',
    sku: 'TOY-VEH-004',
    categorySlug: 'toys-cars-trains-and-vehicles',
    price: 1099,
    oldPrice: 1499,
    stock: 42,
    brand: 'Toykio',
    ageGroup: '2-4 Years',
    material: 'Wood',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-06.jpg?v=1710995380&width=533',
    flags: { isTrending: true },
  },
  {
    name: 'Rainbow Stacker Balance Set',
    sku: 'TOY-STK-005',
    categorySlug: 'stacking-toys',
    price: 799,
    oldPrice: 999,
    stock: 150,
    brand: 'Carter\'s',
    ageGroup: '0-2 Years',
    material: 'Wood',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533',
    flags: { isBestSeller: true },
  },
  {
    name: 'Musical Bear Drum Play Set',
    sku: 'TOY-MUS-006',
    categorySlug: 'musical-toys',
    price: 1599,
    oldPrice: 2199,
    stock: 33,
    brand: 'Toyovo',
    ageGroup: '4-6 Years',
    material: 'Plastic',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533',
    flags: { isFeatured: true, isNewArrival: true },
  },
  {
    name: 'Board Master Family Puzzle',
    sku: 'TOY-BRD-007',
    categorySlug: 'board-games',
    subcategorySlugs: ['iq-games'],
    price: 699,
    oldPrice: 999,
    stock: 96,
    brand: 'Toykio',
    ageGroup: '6-8 Years',
    material: 'Cardboard',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-05-02.jpg?v=1710995381&width=533',
    flags: { isTrending: true, isBestSeller: true },
  },
  {
    name: 'Ride On Mini Scooter',
    sku: 'TOY-RIDE-008',
    categorySlug: 'ride-ons-and-scooters',
    subcategorySlugs: ['scooters'],
    price: 2499,
    oldPrice: 3299,
    stock: 18,
    brand: 'Toyovo',
    ageGroup: '4-6 Years',
    material: 'Plastic',
    image: 'https://toykio.myshopify.com/cdn/shop/files/product-06-02.jpg?v=1710995381&width=533',
    flags: { isNewArrival: true },
  },
];

const seedProducts = async () => {
  if (!env.MONGO_URI) {
    throw new Error('MONGO_URI is required to seed products');
  }

  await connectDB();

  for (const item of products) {
    const category = await Category.findOne({ slug: item.categorySlug, isActive: true });
    if (!category) {
      logger.warn(`Skipping ${item.name}. Category not found: ${item.categorySlug}`);
      continue;
    }

    const subcategories = item.subcategorySlugs?.length
      ? await Category.find({ slug: { $in: item.subcategorySlugs }, isActive: true }).select('_id')
      : [];

    const slug = createSlug(item.name);
    await Product.findOneAndUpdate(
      { slug },
      {
        $set: {
          name: item.name,
          slug,
          sku: item.sku,
          category: category._id,
          subcategories: subcategories.map(subcategory => subcategory._id),
          price: item.price,
          oldPrice: item.oldPrice,
          stock: item.stock,
          brand: item.brand,
          ageGroup: item.ageGroup,
          gender: 'Unisex',
          material: item.material,
          color: ['Red', 'Yellow', 'Blue'],
          size: ['Small', 'Medium', 'Large'],
          images: [{ url: item.image, alt: item.name, sortOrder: 0 }],
          thumbnail: { url: item.image, alt: item.name },
          shortDescription: 'Premium toy crafted for playful learning and safe everyday fun.',
          description: 'A Toyovo India catalog item designed for kids, gifts, and creative playtime. Built to match the Toykio-inspired storefront experience with responsive product media and rich catalog filters.',
          tags: [item.brand, item.ageGroup, item.material, category.name],
          status: 'active',
          ratingAverage: 4.8,
          ratingCount: 18,
          reviewCount: 18,
          soldCount: Math.floor(Math.random() * 120) + 10,
          ...item.flags,
          seoTitle: `${item.name} | Toyovo India`,
          seoDescription: `Buy ${item.name} online at Toyovo India.`,
        },
      },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
    );
  }

  const total = await Product.countDocuments({ status: 'active' });
  logger.info(`Product seed completed. Active products: ${total}.`);
};

seedProducts()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (error) => {
    logger.error(`Product seed failed: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  });
