import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const PRICES = [299, 399, 499, 599, 699, 799, 899, 999, 1299, 1599, 2999];

const SOFT_TOYS_REAL_DATA = [
  { name: "Bonfino 18.5 cm Premium My Little Zoo House", price: 1148, oldPrice: 1995, img: "13195316a.webp", desc: "18 Months+, L 22 x B 16 x H 18.5 cm, 7 Jungle Safari Plush Figurines." },
  { name: "PLAY TOONS 30 cm Giraffe Soft Toy Brown", price: 260, oldPrice: 289, img: "9025124a.webp", desc: "2 Months+, develops social and emotional growth." },
  { name: "Babyhug 30 cm Plush Cow Soft Toy", price: 289, oldPrice: 499, img: "21107641a.webp", desc: "3 Years+, soft, plush texture stimulates tactile senses." },
  { name: "DearJoy 39 cm Elephant Shaped Plush Soft Toy", price: 445, oldPrice: 1000, img: "10710034a.webp", desc: "0 to 10 Years, Non-toxic and soft fabric." },
  { name: "Babyhug 11 cm Soft Baby Ball for Toddlers", price: 84, oldPrice: 165, img: "1395002a.webp", desc: "2 Months+, Cuddly and colourful soft ball." },
  { name: "Babyhug Height 40cm Squishy Penguin Plush Pillow", price: 399, oldPrice: 799, img: "22316737a.webp", desc: "3 Years+, Ultra-soft and lightweight." },
  { name: "Intellibaby Tug N Touch Wonder Ball for Babies", price: 299, oldPrice: 699, img: "21904784a.webp", desc: "0 Months+, Multi-Sensory Activity Plush Toy." },
  { name: "BESTIES 30 cm Pig Family Pig Soft Toys Combo (4pcs)", price: 994, oldPrice: 2000, img: "15245433a.webp", desc: "2 Years+, perfect cuddle partner combo." },
  { name: "Play Nation 90 cm Giant Soft Teddy Bear", price: 1076, oldPrice: 2499, img: "13210779a.webp", desc: "3 Years+, Height 90 cm, Giant size." },
  { name: "Babyhug Disney Olaf Soft Toy 35 cm", price: 749, oldPrice: 1299, img: "21746040a.webp", desc: "2 Months+, Authentic Disney character details." },
];

const MUSICAL_TOYS_REAL_DATA = [
  { name: "Negocio Singing Talking Recording Dancing Cactus Toy", price: 294, oldPrice: 699, img: "19587364a.webp", desc: "0-24 Months, The toy will dance for a few hours, bringing joy." },
  { name: "Babyhug Premium 3 in 1 Bump and Go Smart Swing Penguin", price: 749, oldPrice: 995, img: "15275604a.webp", desc: "0-2 Years, Eye Blinking Animal Toy with Music, Lights & Sounds." },
  { name: "Intellibaby Musical Mobile Multicoloured", price: 468, oldPrice: 999, img: "19155390a.webp", desc: "0-24 Months, Auditory Development with 36 Unique Sounds." },
  { name: "Play Nation Blue Crawling Crab Rechargeable Musical Toy", price: 499, oldPrice: 1499, img: "15810910d.jpg", desc: "3 Years+, Fun Moving Toy with Sound and Lights." },
  { name: "Babyhug Musical Guitar Toy with Lights", price: 898, oldPrice: 1295, img: "21934166a.webp", desc: "12+ Months, Battery Operated Multi-Functional Music Toy." },
  { name: "Babyhug Magnetic Crawling Duck Toy Set", price: 849, oldPrice: 1295, img: "21934157a.webp", desc: "6 Months+, Dancing Mother Duck with Visual & Auditory Development." },
  { name: "YAMAMA Musical Duck Track Slide and Climb Stairs", price: 305, oldPrice: 1199, img: "13867921a.webp", desc: "0-24 Months, Interactive Musical Duck Track Slide." },
  { name: "Babyhug Strawberry Musical Piano Keyboard", price: 567, oldPrice: 1245, img: "14779189a.webp", desc: "0-24 Months, Provides endless hours of joyful music." },
  { name: "Babyhug Premium 2 in 1 Jazz Drum Piano for Kids", price: 549, oldPrice: 995, img: "16028093a.webp", desc: "12 Months+, Fun Musical Toy with 8 Multicolored Piano Keys." },
  { name: "Bonfino Premium Cot Mobile - Safari-Themed", price: 1298, oldPrice: 1995, img: "20120994a.webp", desc: "0-12 Months, Enhances Visual Development & Motor Skills." },
];

const PRODUCT_DATABASE = {
  "Learning & Educational Toys": ["STEM Kit", "Alphabet Puzzle", "Solar Robot", "Flash Cards", "Microscope", "Interactive Globe"],
  "Indoor & Outdoor Play": ["Play Tent", "Garden Slide", "Basketball Hoop", "Ball Pit", "explorer Kit", "Inflatable Castle"],
  "Sports & Games": ["Cricket Set", "Football", "Badminton Kit", "Bowling Set", "Archery Kit", "Skating Gear"],
  "Role & Pretend Play Toys": ["Kitchen Set", "Doctor Kit", "Beauty Vanity", "Tool Bench", "Cash Register", "Chef Playset"],
  "Blocks & Construction Sets": ["Building Blocks", "Magnetic Tiles", "LEGO Style Bricks", "RC Bulldozer", "Wooden Blocks", "Castle Set"],
  "Stacking Toys": ["Rainbow Rings", "Geometric Stacker", "Nesting Cups", "Animal Stacker", "Cup Tower", "Balance Beam"],
  "Kids Puzzles": ["World Map Puzzle", "Animal Jigsaw", "3D Puzzle", "Floor Puzzle", "Shape Sorter", "Alphabet Puzzle"],
  "Baby Rattles": ["Organic Wood Rattle", "Plush Rattle", "Musical Bell", "Teether Rattle", "Sensory Shake", "Hand Rattle"],
  "Toys Cars Trains & Vehicles": ["Racing Car", "Train Set", "Construction Truck", "Police Car", "Toy Plane", "Racing Track"],
  "Dolls & Dollhouses": ["Fashion Doll", "Dream Mansion", "Baby Doll", "Furniture Kit", "Doll Stroller", "Princess Doll"],
  "Push & Pull Along Toys": ["Pull Along Puppy", "Activity Walker", "Block Wagon", "Pull Along Turtle", "Duck Push Toy", "Spin Toy"],
  "Art Crafts & Hobby Kits": ["Pottery Kit", "Finger Paints", "DIY Bracelet", "Clay Set", "Water Drawing Mat", "Sewing Machine"],
  "Board Games": ["Junior Scrabble", "Ludo Classic", "Business Game", "Chess Set", "Mystery Game", "Sequence Kids"],
  "Action Figures & Collectibles": ["Hero Figure", "Dragon Toy", "Dinosaur Set", "Robot Transformer", "Warrior Figure", "Collectible Card"],
  "Radio & Remote Control Toys": ["RC Fast Car", "Mini Drone", "RC Robot", "RC Helicopter", "RC Boat", "RC Bike"],
  "Bath Toys": ["Rubber Duck", "Water Squirter", "Bath Boat", "Bubble Maker", "Floating Toy", "Bath Net"],
  "Toys Guns & Weapons": ["Soft Dart Blaster", "Water Soaker", "Laser Tag", "Sword Set", "Foam Bow", "Combat Kit"],
  "RIDE-ONS & SCOOTERS": ["Electric Ride-on Car", "3-Wheel Scooter", "Swing Car", "Bicycle", "Balance Bike", "Tricycle"],
  "HOME PLAY ACTIVITIES": ["Dough Set", "Mega Art Activity", "Construction Kit", "Kitchen Playset", "Home Piano", "Home Tent"]
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Cleaning products...');
    await Product.deleteMany({});

    const subCats = await Category.find({ parentCategory: { $ne: null } }).populate('parentCategory');
    
    for (const sub of subCats) {
      const parent = sub.parentCategory;
      const isSoftToy = parent.name === "Soft Toys";
      const isMusicalToy = parent.name === "Musical Toys";
      
      console.log(`🛍️ Seeding for: ${sub.name} (Parent: ${parent.name})`);
      
      let itemsToSeed = [];
      if (isSoftToy) itemsToSeed = SOFT_TOYS_REAL_DATA;
      else if (isMusicalToy) itemsToSeed = MUSICAL_TOYS_REAL_DATA;

      if (itemsToSeed.length > 0) {
        for (let i = 0; i < itemsToSeed.length; i++) {
          const item = itemsToSeed[i];
          const imgUrl = `https://cdn.fcglcdn.com/brainbees/images/products/219x265/${item.img}`;
          
          await Product.create({
            name: `${item.name} (${sub.name})`,
            description: item.desc,
            shortDescription: `Premium ${item.name} for children.`,
            category: parent._id,
            subcategories: [sub._id],
            brand: item.name.split(' ')[0],
            price: item.price,
            oldPrice: item.oldPrice,
            stock: 50,
            status: 'active',
            ageGroup: item.desc.split(',')[0],
            gender: 'Unisex',
            material: 'Premium Quality',
            isFeatured: i === 0,
            isTrending: i === 1,
            images: [{ url: imgUrl, alt: item.name }],
            thumbnail: { url: imgUrl, alt: item.name }
          });
        }
      } else {
        const namesPool = PRODUCT_DATABASE[parent.name] || ["Premium Toy"];
        for (let i = 1; i <= 8; i++) {
          const baseName = namesPool[i % namesPool.length];
          const productName = `${baseName} for ${sub.name} #${i}`;
          const price = PRICES[Math.floor(Math.random() * PRICES.length)];
          // Using unique signature for each image to avoid duplicates
          const imgUrl = `https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800&sig=${sub._id}${i}`;

          await Product.create({
            name: productName,
            description: `Quality ${productName}. Safe and fun for children.`,
            shortDescription: `Best item in ${sub.name}.`,
            category: parent._id,
            subcategories: [sub._id],
            brand: 'Toyovo',
            price: price,
            oldPrice: price + 200,
            stock: 100,
            status: 'active',
            ageGroup: '3-6 Years',
            gender: 'Unisex',
            material: 'Child-Safe Material',
            isFeatured: i === 1,
            images: [{ url: imgUrl, alt: productName }],
            thumbnail: { url: imgUrl, alt: productName }
          });
        }
      }
      process.stdout.write('Done ');
    }

    console.log('\n\n✨ Musical Toys & Soft Toys seeded with Real Data! Others seeded with Unique Images.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
