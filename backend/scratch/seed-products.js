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

const LEARNING_EDUCATIONAL_REAL_DATA = [
  { name: "Babyhug Little Explorer UFO Teether Toy", price: 316, oldPrice: 599, img: "18044571a.webp", desc: "4 Months+, Sensory Pull-String Teething Toy | BPA-Free Soft Silicone." },
  { name: "Intellibaby Premium Shape Sorter Cube for Toddlers", price: 178, oldPrice: 399, img: "15392685a.webp", desc: "0-24 Months, 18 Multicoloured Shapes | Builds Motor Skills." },
  { name: "Play Nation Rechargeable Talking Flash Cards", price: 299, oldPrice: 599, img: "19908252a.webp", desc: "2 Years+, Kids Reading Machine with 112 Cards | Montessori Toys." },
  { name: "NEGOCIO Educational Laptop With 20 Fun Activities", price: 763, oldPrice: 1999, img: "20141386a.webp", desc: "3 Years+, English Learner Kids Laptop for fun and entertaining learning." },
  { name: "Babyhug Premium Musical Activity Table", price: 2299, oldPrice: 3495, img: "15275596a.webp", desc: "12 Months+, Multi Activity Play Table with Shapes, Numbers, Colors & Sound." },
  { name: "Intelliskills Flashcards & Rechargeable Talker Set", price: 299, oldPrice: 599, img: "21794041a.webp", desc: "3 Years+, 224 Words-12 Topics | Audio Reader, 112 Double-Sided Cards." },
  { name: "Play Nation Educational Laptop with LED Screen", price: 748, oldPrice: 1699, img: "21630477a.webp", desc: "3 Years+, Games, Alphabet and Number Learning | Battery Operated." },
  { name: "NEGOCIO 6 in 1 Activity Cube Toy", price: 500, oldPrice: 999, img: "22279086a.webp", desc: "0-24 Months, Early Learning Interaction Toy for Kids." },
  { name: "Play Nation Montessori Geometric Stacker", price: 156, oldPrice: 249, img: "22075127a.webp", desc: "0-24 Months, Colour Matching Puzzle for Toddlers builds Logical Thinking." },
  { name: "Intellibaby Roll-A-Round Waterproof Spiral Tracker", price: 291, oldPrice: 899, img: "15878124a.webp", desc: "9 Months+, 6-Layer Ball Drop & Roll Swirling Tower." },
];

const INDOOR_OUTDOOR_REAL_DATA = [
  { name: "Babyhug 3 in 1 Slide and Rocker", price: 1898, oldPrice: 2999, img: "14520766a.webp", desc: "18 Months to 4 Years, Multi-Purpose Toy for Indoor or Outdoor Play." },
  { name: "SYGA Rectangular Family Swimming Pool", price: 1519, oldPrice: 3999, img: "11327168a.webp", desc: "5 to 15 Years, 1.45 Meters 3 Layer Inflatable Tub for Kids." },
  { name: "Intellibaby 2-in-1 Adventure Time Tent House", price: 1199, oldPrice: 2999, img: "20187626a.webp", desc: "2 Years+, Wild Animals Safe & Soft Pit with 25 Balls." },
  { name: "Play Nation Premium Dino Slide for Kids", price: 1799, oldPrice: 3999, img: "15355268a.webp", desc: "2 to 4 Years, Mini Freestanding Foldable Indoor Slider." },
  { name: "Intelliskills Premium Jungle Safari Tent House", price: 667, oldPrice: 1599, img: "16250428a.webp", desc: "2 Years+, Foldable Hut Size Tent for Boys & Girls." },
  { name: "Babyhug Playtime Unicorn Foldable Tent House", price: 649, oldPrice: 1595, img: "9218007a.webp", desc: "3 Years+, Portable Playhouse encourages team play and adventure." },
  { name: "Fiddlerz Hut Type Jumbo Size Play Tent House", price: 639, oldPrice: 1599, img: "17986584a.webp", desc: "3 Years+, Waterproof, lightweight and foldable jumbo tent." },
  { name: "Babyhug Jungle-Themed Pop-Up Play Tent", price: 1698, oldPrice: 2745, img: "12657625a.webp", desc: "3 Years+, Stimulates Imagination & Independent Play." },
];

const STACKING_TOYS_REAL_DATA = [
  { name: "Intelliskills Multicoloured Stacking Cubes", price: 119.01, oldPrice: 349, img: "13027663a.webp", desc: "Ideal Age 0 to 24 Months, Nesting & Sequencing Toy | 10 Numbered Shapes." },
  { name: "Aditi Toys Spinning Stacking Tower Toy", price: 697.05, oldPrice: 1999, img: "21082758a.webp", desc: "Idea Age 0 to 24 Months , High-quality, BPA-free ABS plastic with a 10 mm..." },
  { name: "Babyhug Premium 5 Colorful Stacking Rings", price: 150.45, oldPrice: 295, img: "12489457a.webp", desc: "Ideal Age 0 to 24 Months, L 12 x B 12 x H 18 cm, Colorful rings." },
  { name: "Babyhug 8 Pieces Montessori Stacking Cup", price: 113.46, oldPrice: 245, img: "10651831a.webp", desc: "Ideal Age 0 to 24 Months, Shapes, Colors & Number Recognition." },
  { name: "IntelliBaby 3-in-1 Shape & Stacking Cups", price: 165.94, oldPrice: 399, img: "15878114a.webp", desc: "Ideal Age 0 to 24 Months, Sorting, Nesting & Water Play." },
  { name: "Intelliskills Premium Wooden Rainbow Blocks Stacker", price: 332.47, oldPrice: 999, img: "12774322a.webp", desc: "Ideal Age 0 to 24 Months, Multicolour - 7 Pieces." },
  { name: "Bonfino 5 Pcs Plush Tiger Stacking Ring Toy", price: 549.04, oldPrice: 995, img: "13195315a.webp", desc: "Ideal Age 0 to 24 Months, 4 Rings and 1 Pole Soft Stacking Toy." },
  { name: "ADKD Rainbow Spinning Stacking Tower", price: 389.14, oldPrice: 1499, img: "22008763a.webp", desc: "Ideal age 0 to 24 months , 5 Ring Blocks- Multicolor." },
  { name: "Fab N Funky Glass Stacking Game", price: 222.64, oldPrice: 399, img: "18752895a.webp", desc: "Ideal Age 0 to 24 Months, 66 Pieces | Multicolour | Fun & Educational Toy." },
  { name: "Intelliskills Premium Wooden Rainbow Balancing Ship", price: 389.61, oldPrice: 999, img: "18340880a.webp", desc: "Ideal Age 0 to 24 Months, Fine Motor Skills Development | Hand-Eye Coordination." },
  { name: "Play Nation 10 Colorful & Textured Stacking Rings", price: 299, oldPrice: 499, img: "21934160a.webp", desc: "Ideal age 0 to 24 months, Easy to Grip & Hold | Educational Stack-Up Toy." },
];

const KIDS_PUZZLES_REAL_DATA = [
  { name: "Play Nation Wooden Educational Puzzles Set of 4", price: 398.6, oldPrice: 999, img: "19219939d.jpg", desc: "2 Years+, Alphabets, Numbers, Fruits & Vegetables | Fun Learning Toy." },
  { name: "Intelliskills 3-in-1 Wooden Puzzle Tray Set", price: 299, oldPrice: 749, img: "20178804a.webp", desc: "Ideal Age 2 to 4 Years, Alphabet, Numbers & Shapes | Montessori Educational Toy." },
  { name: "YAMAMA Wooden Magnetic Board Puzzle Toys", price: 535.71, oldPrice: 1299, img: "16194508a.webp", desc: "3 Years+, 2 In 1 Magnetic Board Puzzle Games | Animal Pattern." },
  { name: "Firstcry Intelliskills Magnetic STEM Puzzle", price: 495.96, oldPrice: 1200, img: "10127430a.webp", desc: "4 Years+, 300 Patterns Learning Toy | Construction & Problem Solving." },
  { name: "Babyhug Premium 26 pcs Capital Alphabet Puzzle", price: 199.06, oldPrice: 345, img: "2611411a.webp", desc: "Ideal Age 2 to 4 Years, ABC Puzzle Montessori Educational Toy." },
  { name: "Intelliskills Foldable Magnetic Tangram", price: 249, oldPrice: 599, img: "18448314a.webp", desc: "3 Years+, Educational Portable Puzzle for Kids | Brain Teaser." },
  { name: "Smartivity Kids Montessori Slide Puzzle", price: 459.01, oldPrice: 529, img: "19825875a.webp", desc: "4+ Years, Color & Pattern Matching Learning Toy." },
  { name: "Intelliskills Animal Pattern Puzzle for Kids", price: 219.01, oldPrice: 399, img: "21042544a.webp", desc: "3 Years+, Colour Coder Toy- Wild Animals Jungle Theme." },
];

const BABY_RATTLES_REAL_DATA = [
  { name: "Intellibaby Tiny Tails Tiger Handheld Rattle", price: 128.99, oldPrice: 299, img: "20187682b.jpg", desc: "Ideal Age 0 to 24 Months, Soft Animal Plush Toy | Squeeze Handle." },
  { name: "Babyhug Cute Animal Shaped Baby Rattle Set (6Pcs)", price: 419, oldPrice: 595, img: "14779191a.webp", desc: "Ideal Age 0 to 24 Months, Newborn Sensory Toys for Grasping." },
  { name: "Intellibaby Crochet & Wood Bunny Rattle", price: 424.99, oldPrice: 599, img: "9958264a.webp", desc: "Ideal age 0 to 24 Months, Tactile & Auditory Development." },
  { name: "FUNVERSE Set of 7 Premium Rattle Set", price: 139.86, oldPrice: 999, img: "21978145a.webp", desc: "Ideal age 0 to 24 Months, Colourful Plastic Non Toxic." },
  { name: "Bonfino Handmade Crochet Wooden Giraffe Rattle", price: 448.97, oldPrice: 695, img: "14093207a.webp", desc: "Ideal age 0 to 24 Months, Made from knitted cotton." },
  { name: "Intellibaby Premium Neem Wood Baby Rattles Set", price: 281.53, oldPrice: 599, img: "18144879a.webp", desc: "Ideal age 0 to 24 Months, Multi-sensory stimulation toy." },
  { name: "Babyhug Premium Tiger Free Wheel Car Rattle", price: 159, oldPrice: 295, img: "11384335a.webp", desc: "Ideal age 0 to 24 months, Improves Motor Skills." },
  { name: "Intellibaby Premium Musical Sensory Rattle Ball", price: 340.96, oldPrice: 999, img: "15954102a.webp", desc: "Ideal Age 0 to 24 Months, Moving Light & Sound Toys." },
  { name: "Intellibaby Tiny Tails Giraffe Handheld Rattle", price: 128.99, oldPrice: 299, img: "20187683a.webp", desc: "Ideal Age 0 to 24 Months, Squeeze Handle for Squeaky Sound." },
];

const PRODUCT_DATABASE = {
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
  "HOME PLAY ACTIVITIES": ["Dough Set", "Mega Art Activity", "Construction Kit", "Kitchen Playset", "Home Piano", "Home Drum Set"]
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
      const isLearningToy = parent.name === "Learning & Educational Toys";
      const isIndoorOutdoor = parent.name === "Indoor & Outdoor Play";
      const isStackingToy = parent.name === "Stacking Toys";
      const isKidsPuzzle = parent.name === "Kids Puzzles";
      const isBabyRattle = parent.name === "Baby Rattles";
      
      console.log(`🛍️ Seeding for: ${sub.name} (Parent: ${parent.name})`);
      
      let itemsToSeed = [];
      if (isSoftToy) itemsToSeed = SOFT_TOYS_REAL_DATA;
      else if (isMusicalToy) itemsToSeed = MUSICAL_TOYS_REAL_DATA;
      else if (isLearningToy) itemsToSeed = LEARNING_EDUCATIONAL_REAL_DATA;
      else if (isIndoorOutdoor) itemsToSeed = INDOOR_OUTDOOR_REAL_DATA;
      else if (isStackingToy) itemsToSeed = STACKING_TOYS_REAL_DATA;
      else if (isKidsPuzzle) itemsToSeed = KIDS_PUZZLES_REAL_DATA;
      else if (isBabyRattle) itemsToSeed = BABY_RATTLES_REAL_DATA;

      if (itemsToSeed.length > 0) {
        for (let i = 0; i < itemsToSeed.length; i++) {
          const item = itemsToSeed[i];
          const imgUrl = `https://cdn.fcglcdn.com/brainbees/images/products/219x265/${item.img}`;
          
          await Product.create({
            name: `${item.name} (${sub.name})`,
            description: item.desc,
            shortDescription: `Authentic ${item.name} for children.`,
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
            isFeatured: i % 3 === 0,
            isTrending: i % 3 === 1,
            isNewArrival: i % 3 === 2,
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
            isFeatured: i % 3 === 0,
            isTrending: i % 3 === 1,
            isNewArrival: i % 3 === 2,
            images: [{ url: imgUrl, alt: productName }],
            thumbnail: { url: imgUrl, alt: productName }
          });
        }
      }
      process.stdout.write('Done ');
    }

    console.log('\n\n✨ Real data added for major categories!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
