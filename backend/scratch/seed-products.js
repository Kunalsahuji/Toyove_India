import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';
import Review from '../src/models/Review.js';
import User from '../src/models/User.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const PRICES = [299, 499, 799, 999, 1299, 1499, 1999];

// --- FIRSTCRY REAL DATA (As provided by user) ---
const SOFT_TOYS_REAL_DATA = [
  { name: "Bonfino 18.5 cm Premium My Little Zoo House with Carry Handle", price: 1148.92, oldPrice: 1995, img: "13195316a.webp", desc: "18 Months+, L 22 x B 16 x H 18.5 cm, Make playtime fun and educational with 7 Jungle Safari Plush Figurines." },
  { name: "PLAY TOONS 30 cm Giraffe Soft Toy Brown - (Color May Vary)", price: 260.1, oldPrice: 289, img: "9025124a.webp", desc: "2 Months+, develops social and emotional growth, keeps kids playful for hours." },
  { name: "Babyhug 30 cm Plush Cow Soft Toy - Toddler Gifting", price: 289.42, oldPrice: 499, img: "21107641a.webp", desc: "3 Years+, The soft, plush texture stimulates tactile senses, while the cute cow design sparks imagination." },
  { name: "DearJoy 39 cm Elephant Shaped Plush Soft Toy - Grey", price: 445, oldPrice: 1000, img: "10710034a.webp", desc: "0 to 10 Years, L 55 x B 17 x H 39 cm, It is made from non-toxic and soft fabric." },
  { name: "Babyhug 11 cm Soft Baby Ball for Toddlers | Multicolour", price: 84.15, oldPrice: 165, img: "1395002a.webp", desc: "2 Months+, 11 cm, Helps emotional growth, Cuddly and colourful soft ball for sensory play." },
  { name: "Babyhug Height 40cm Squishy Penguin Plush Pillow Ultra-Soft", price: 399.02, oldPrice: 799, img: "22316737a.webp", desc: "3 Years+, Ultra-soft and lightweight squishy penguin plush pillow for hugs and comfort." },
  { name: "Intellibaby Tug N Touch Wonder Ball for Babies | Multi-Sensory", price: 299.03, oldPrice: 699, img: "21904784a.webp", desc: "0 Months+, This lobe supports motor control. It develops as your baby explores textures." },
  { name: "BESTIES 30 cm Pig Family Pig Soft Toys Combo Of 4pcs Multicolor", price: 994.2, oldPrice: 2000, img: "15245433a.webp", desc: "2 Years+, A perfect cuddle partner made with soft fabric and plush filling for endless fun." },
  { name: "Play Nation 90 cm Giant Soft Teddy Bear with Red Bow | Off White", price: 1076.57, oldPrice: 2499, img: "13210779a.webp", desc: "3 Years+, Height 90 cm, develops social and emotional growth, keeps kids comfort." }
];

const MUSICAL_TOYS_REAL_DATA = [
  { name: "Negocio Singing Talking Recording Dancing Cactus Toy", price: 294.63, oldPrice: 699, img: "19587364a.webp", desc: "Ideal Age 0 to 24 Months, The toy will dance for a few hours, bringing joy to your home." },
  { name: "Babyhug Premium 3 in 1 Bump and Go Smart Swing Penguin", price: 749.04, oldPrice: 995, img: "15275604a.webp", desc: "Ideal Age 0 to 24 Months, Eye Blinking Animal Toy With Music, Lights & Sounds." },
  { name: "Intellibaby Musical Mobile Multicoloured", price: 468.93, oldPrice: 999, img: "19155390a.webp", desc: "Ideal Age 0 to 24 Months, Auditory Development with 36 Unique Sounds and Learning Sounds." },
  { name: "Play Nation Blue Crawling Crab Rechargeable Musical Toy", price: 499.02, oldPrice: 1499, img: "15810910a.webp", desc: "Ideal Age 0 to 24 Months, Promotes social emotional growth and fine motor skills." },
  { name: "Babyhug Musical Guitar Toy with Lights", price: 898.99, oldPrice: 1295, img: "21934166a.webp", desc: "Ideal age 0 to 24 months, A fun, safe musical guitar that sparks creativity in toddlers." },
  { name: "Babyhug Magnetic Crawling Duck Toy Set - Yellow", price: 849, oldPrice: 1295, img: "21934157a.webp", desc: "Ideal age 0 to 24 month, Fun crawling duck toy with music & LED lights engages babies." },
  { name: "YAMAMA Musical Duck Track Slide and Climb Stairs Toy", price: 305.39, oldPrice: 1199, img: "13867921a.webp", desc: "Ideal age 0 to 24 Months, An Interactive Musical Duck Track Slide with 3 cute ducks." },
  { name: "Babyhug Strawberry Musical Piano Keyboard - Red", price: 567.72, oldPrice: 1245, img: "14779189a.webp", desc: "Ideal Age 0 to 24 Months, This Piano provides endless hours of joyful musical learning." },
  { name: "Babyhug Premium 2 in 1 Jazz Drum Piano for Kids - Blue", price: 549.04, oldPrice: 995, img: "16028093a.webp", desc: "Ideal Age 0 to 24 Months, Kickstart your little one's musical journey with jazz drum sounds." },
  { name: "Bonfino Premium Cot Mobile - Safari-Themed Hanging Toy", price: 1298.94, oldPrice: 1995, img: "20120994a.webp", desc: "Ideal Age 0 to 12 Months, Safari Adventure cot mobile for visual development." }
];

const INDOOR_OUTDOOR_REAL_DATA = [
  { name: "Babyhug 3 in 1 Slide and Rocker with Basketball Ring and A Plastic Ball", price: 1898.97, oldPrice: 2999, img: "14520766a.webp", desc: "18 months to 4 years, Develops fine motor and social skills with fun and multi-purpose play." },
  { name: "SYGA Rectangular Family Swimming Pool Inflatable Tub Kiddie Pool 3 Layer", price: 1519.62, oldPrice: 3999, img: "11327168a.webp", desc: "5 to 15 Years, L 145 x B 100 x H 50 cm, family swimming pool for outdoor garden fun." },
  { name: "Intellibaby 2-in-1 Adventure Time Tent House & Ball Pool", price: 1199, oldPrice: 2999, img: "20187626a.webp", desc: "2 Years+, Spacious tent house with 25 balls, easy to set-up for indoor & outdoor play." },
  { name: "Play Nation Premium Blue and Yellow Dino Slide for Kids", price: 1799.15, oldPrice: 3999, img: "15355268a.webp", desc: "2 to 4 Years, L 131 x B 42 x H 72 cm, Mini freestanding foldable indoor slider." },
  { name: "Intelliskills Premium Jungle Safari Themed Foldable Hut Size Tent House", price: 667.1, oldPrice: 1599, img: "16250428a.webp", desc: "2 Years+, Printed portable playhouse, lightweight and BIS approved for gifting." },
  { name: "Babyhug Playtime Unicorn Foldable Tent House - Pink", price: 649.17, oldPrice: 1595, img: "9218007a.webp", desc: "3 Years+, L 95 x B 72 x H 105 cm, Encourages team play and creativity for toddlers." },
  { name: "Fiddlerz Hut Type Kids Toys Jumbo Size Play Tent House", price: 639.44, oldPrice: 1599, img: "17986584a.webp", desc: "3 Years+, Waterproof, lightweight and foldable jumbo size play tent for kids." },
  { name: "Babyhug Jungle-Themed Pop-Up Play Tent for Kids", price: 1698.88, oldPrice: 2745, img: "12657625a.webp", desc: "3 Years+, L 120 x B 120 x H 130 cm, Stimulates imagination and independent play." }
];

const LEARNING_EDUCATION_REAL_DATA = [
  { name: "Babyhug Little Explorer UFO Teether Toy | Sensory Pull-String Teething Toy", price: 316.99, oldPrice: 599, img: "18044571a.webp", desc: "4 months+, Sensory Toy for Babies, designed to stimulate curiosity and hand-eye coordination." },
  { name: "Intellibaby Premium Shape Sorter Cube for Toddlers | 18 Multicoloured Shapes", price: 178.99, oldPrice: 399, img: "15392685a.webp", desc: "Ideal Age 0 to 24 Months, This toy introduces children to different colors and builds motor skills." },
  { name: "Play Nation Rechargeable Talking Flash Cards Learning and Educational Toys", price: 299.02, oldPrice: 599, img: "19908252a.webp", desc: "2 Years+, Interactive & Engaging: Encourages independent learning through reading machine with 112 cards." },
  { name: "NEGOCIO Educational Laptop With 20 Fun Activities - Blue", price: 763.42, oldPrice: 1999, img: "20141386a.webp", desc: "3 Years+, English Learner Kids Laptop Make learning fun and entertaining with 20 activities." },
  { name: "Babyhug Premium Musical Activity Table | Multi Activity Play Table for 1 Year+", price: 2299.01, oldPrice: 3495, img: "15275596a.webp", desc: "12 Months+, Multifunctional activity table to keep your little one engaged with sounds and lights." },
  { name: "Intelliskills Flashcards & Rechargeable Talker Set | 224 Words-12 Topics", price: 299.02, oldPrice: 599, img: "21794041a.webp", desc: "3 Years+, Pairs image-and-text cards with audio to build vocabulary and listening skills." },
  { name: "Play Nation Educational Laptop With Fun Activities | Electronic Laptop with LED Screen", price: 748.92, oldPrice: 1699, img: "21630477a.webp", desc: "3 years +, Features fun games like object catching, matching pairs, and number learning." },
  { name: "Play Nation Montessori Geometric Stacker & Shape Sorting Toy", price: 156.47, oldPrice: 249, img: "22075127a.webp", desc: "Ideal Age 0 to 24 Months, A colorful Montessori-inspired geometric stacker for fine motor skills." },
  { name: "Intellibaby Roll-A-Round Waterproof Spiral Tracker | 6-Layer Ball Drop", price: 291.01, oldPrice: 899, img: "15878124a.webp", desc: "9 Month+, Provides endless entertainment while developing tracking and motor skills." },
  { name: "Babyhug Premium 12-in-1 Activity Cube Educational Toy | Learning Cube", price: 1348.95, oldPrice: 2995, img: "12609297a.webp", desc: "2 Years+, L 19.5 x B 19 x H 25.5 cm, Engaging activity cube with piano, gears, and beads." }
];

const STACKING_TOYS_REAL_DATA = [
  { name: "Intelliskills Multicoloured Stacking Cubes | Nesting & Sequencing Toy", price: 119.01, oldPrice: 349, img: "13027663a.webp", desc: "Ideal Age 0 to 24 Months, 10 Numbered Shapes, Cognitive Skills, Educational Play." },
  { name: "Aditi Toys Spinning Stacking Tower Toy | Multicolor", price: 697.05, oldPrice: 1999, img: "21082758a.webp", desc: "Idea Age 0 to 24 Months, High-quality, BPA-free ABS plastic with a 10 mm spinning rings." },
  { name: "Babyhug Premium 5 Colorful Stacking Rings | Junior Plastic Stack Up", price: 150.45, oldPrice: 295, img: "12489457a.webp", desc: "Ideal Age 0 to 24 Months, L 12 x B 12 x H 18 cm, Colorful rings keep them engaged." },
  { name: "Babyhug 8 Pieces Montessori Stacking Cup with Shapes & Numbers", price: 113.46, oldPrice: 245, img: "10651831a.webp", desc: "Ideal Age 0 to 24 Months, Toddler stacking toy for water & beach play, motor skills." },
  { name: "IntelliBaby 3-in-1 Shape & Stacking Cups | Sorting & Nesting", price: 165.94, oldPrice: 399, img: "15878114a.webp", desc: "Ideal Age 0 to 24 Months, This toy will help your toddler's creativity and cognitive skills." },
  { name: "Intelliskills Premium Wooden Rainbow Blocks Stacker | 7 Pieces", price: 332.47, oldPrice: 999, img: "12774322a.webp", desc: "Ideal Age 0 to 24 Months, L 19.54 x B 29.7 x H 1.10 cm, Vibrant wooden rainbow blocks." },
  { name: "Bonfino 5 Pcs Plush Tiger Stacking Ring Toy | Soft Stacking Toy", price: 549.04, oldPrice: 995, img: "13195315a.webp", desc: "Ideal Age 0 to 24 Months, D 13.5 x H 22 cm, Fun tiger face on top, STEM Montessori toy." },
  { name: "ADKD Rainbow Spinning Stacking Tower Stacking Toy | 5 Rings", price: 389.14, oldPrice: 1499, img: "22008763a.webp", desc: "Ideal age 0 to 24 months, Bright rainbow colors capture attention and develop motor skills." },
  { name: "Fab N Funky Glass Stacking Game - 66 Pieces | Multicolour", price: 222.64, oldPrice: 399, img: "18752895a.webp", desc: "Ideal Age 0 to 24 Months, Engage in a thrilling game of balance and focus." },
  { name: "Intelliskills Premium Wooden Rainbow Balancing Ship Stacker", price: 389.61, oldPrice: 999, img: "18340880a.webp", desc: "Ideal Age 0 to 24 Months, Fine Motor Skills Development, Problem-Solving for Toddlers." }
];

const KIDS_PUZZLES_REAL_DATA = [
  { name: "Play Nation Wooden Educational Puzzles Set of 4 | Alphabets & Numbers", price: 398.6, oldPrice: 999, img: "19219939a.jpg", desc: "2 Years+, It combines learning of letters, numbers, and basic concepts with fun." },
  { name: "Intelliskills 3-in-1 Wooden Puzzle Tray Set for Kids", price: 299, oldPrice: 749, img: "20178804a.webp", desc: "Ideal Age 2 to 4 Years, Triple the fun with this versatile puzzle tray for recognition." },
  { name: "YAMAMA Wooden Magnetic Board Puzzle Toys 2 In 1", price: 535.71, oldPrice: 1299, img: "16194508a.webp", desc: "3 Years+, Double-sided design with magnetic jigsaw and drawing easel blackboard." },
  { name: "Firstcry Intelliskills Magnetic Create With Shapes STEM Puzzle", price: 495.96, oldPrice: 1200, img: "10127430a.webp", desc: "4 Years+, L 32 x B 24 x H 4 cm, Geometry and problem-solving construction set." },
  { name: "Babyhug Premium 26 pcs Capital Alphabet Wooden Board puzzle", price: 199.06, oldPrice: 345, img: "2611411a.webp", desc: "Ideal Age 2 to 4 Years, 29 x 22 cm, colorful knob and peg puzzle for preschool learning." },
  { name: "Intelliskills Foldable Magnetic Tangram | Educational Puzzle", price: 249, oldPrice: 599, img: "18448314a.webp", desc: "3 Years +, Our premium set includes 200 unique puzzles, brain teaser travel toy." },
  { name: "Smartivity Kids Montessori Slide Puzzle | Color & Pattern", price: 459.01, oldPrice: 529, img: "19825875a.webp", desc: "4 to 8 Years, Slide puzzle for color and pattern matching, logical brain development." },
  { name: "Intelliskills Animal Pattern Puzzle for Kids | Colour Coder", price: 219.01, oldPrice: 399, img: "21042544a.webp", desc: "3 Years +, 30 Challenges with 3 levels, boosts logical thinking and animal recognition." }
];

const BABY_RATTLES_REAL_DATA = [
  { name: "Intellibaby Tiny Tails Tiger Handheld Rattle for Infants | Soft Animal Plush", price: 128.99, oldPrice: 299, img: "20187682a.webp", desc: "Ideal Age 0 to 24 Months, A roar of fun in tiny hands! This adorable tiger toy squeaks when squeezed." },
  { name: "Babyhug Cute Animal Shaped Baby Rattle Set | Newborn Sensory Toys | 6Pcs", price: 419, oldPrice: 595, img: "14779191a.webp", desc: "Ideal Age 0 to 24 Months, Lightweight vibrant colored rattles for grasping and motor skill development." },
  { name: "Intellibaby Crochet & Wood Bunny Rattle | Tactile & Auditory Development", price: 424.99, oldPrice: 599, img: "9958264a.webp", desc: "Ideal age 0 to 24 Months, L 180 x B 60 x H 60 cm, Develops baby's Palmar grasp and auditory sense." },
  { name: "FUNVERSE Set of 7 Premium Rattle Set | Colourful Plastic Non Toxic Rattles", price: 139.86, oldPrice: 999, img: "21978145a.webp", desc: "Ideal age 0 to 24 Months, BPA Free ABS plastic rattles and teethers for newborns." },
  { name: "Bonfino Handmade Crochet Wooden Giraffe Rattle | Natural Wool Sensory Toy", price: 448.97, oldPrice: 695, img: "14093207a.webp", desc: "Ideal age 0 to 24 Months, Made from knitted cotton, perfect for soothing and sensory play." },
  { name: "Intellibaby Premium Neem Wood Jungle Theme Baby Rattles & Teether Set", price: 281.53, oldPrice: 599, img: "18144879a.webp", desc: "Ideal age 0 to 24 Months, Child-safe wood, multi-sensory stimulation for hand-grip and motor skills." },
  { name: "Babyhug Premium Tiger Free Wheel Car Cum Orange Rattle Toy | Fun & Soothing", price: 159, oldPrice: 295, img: "11384335a.webp", desc: "Ideal age 0 to 24 months, L 10 x B 8 x H 9 cm, Fun, flexible car that doubles as a rattle." },
  { name: "Intellibaby Premium Musical Sensory Grasping Rattle Ball | Interactive Light", price: 340.96, oldPrice: 999, img: "15954102a.webp", desc: "Ideal Age 0 to 24 Months, Interactive moving light & sound ball that is touch activated." },
  { name: "Intellibaby Tiny Tails Giraffe Handheld Rattle for Infants | Squeaky Sound", price: 128.99, oldPrice: 299, img: "20187683a.webp", desc: "Ideal Age 0 to 24 Months, Stretch playtime fun with this cute giraffe handheld rattle." }
];

const PLAY_GYMS_MATS_REAL_DATA = [
  { name: "Intelliskills Extra Large Reversible Jungle Animals & Ocean Life Foldable Play Mat", price: 749.01, oldPrice: 2299, img: "16865160a.webp", desc: "Ideal Age 0 to 4 Years, Waterproof and anti-skid learning & crawling mat (6.5 x 4.5 ft)." },
  { name: "Babyhug Premium Reversible Waterproof Floor mat- 6 ft x 5 ft", price: 848.98, oldPrice: 1999, img: "16310907a.webp", desc: "Ideal Age 0 to 4 Years, Educational mat with stimulating and vibrant colours for massage and play." },
  { name: "Play Nation Premium Baby Kick and Play Piano Dino Theme Play Gym", price: 649.08, oldPrice: 1799, img: "20615939a.webp", desc: "Ideal Age 0 to 24 Months, Portable playmat with lights, music, and 5 hanging rattles." },
  { name: "Zest 4 Toyz Play Gym With Lights & Sound | Color May Vary", price: 689.77, oldPrice: 2999, img: "18002081a.webp", desc: "0 Months+, 75 x 42 x 60 cm, helps baby discover new things through sensory play." },
  { name: "Babyhug Disney Premium Reversible Waterproof Floor mat- 6ftx4ft", price: 799, oldPrice: 1999, img: "19483603a.webp", desc: "Ideal Age 0 to 4 Years, Disney themed mat with stimulating and vibrant colours." },
  { name: "Intellibaby Premium Dino Discovery Crawling Play Mat | Double-Sided", price: 698.92, oldPrice: 1599, img: "22149104a.webp", desc: "Ideal age 0 to 4 Years, 6x4 ft mat encouraging crawling, tummy time, and active play." },
  { name: "Play Nation Premium Baby Kick and Play Piano Peach Play Gym", price: 698.97, oldPrice: 2499, img: "15158586a.webp", desc: "Ideal Age 0 to 24 Months, Animal theme play mat with built-in musical keyboard piano." },
  { name: "NEGOCIO Double Sided Water Proof Extra Large Foldable Foam Baby Play Mat", price: 823.7, oldPrice: 1499, img: "13353030a.webp", desc: "0 to 4 Years, L 198 X B 148 cm, Soft tone colors that are gentle on baby's eyes." }
];

const SPORTS_GAMES_REAL_DATA = [
  { name: "Sanjary Hanging Table Tennis Trainer Ping Pong Ball Self Training Indoor Set", price: 302.05, oldPrice: 863, img: "14747736a.webp", desc: "3 years+, it can be hung anywhere, and you can practice table tennis independently." },
  { name: "Babyhug Basketball Play Set with Adjustable Stand - Red & Yellow", price: 1798.92, oldPrice: 2245, img: "10098521a.webp", desc: "3 Years+, L 52 x B 37 x H 146 cm, Basketball stand adjusts to five heights for coordination." },
  { name: "ADKD Hanging Table Tennis Trainer Ping Pong Ball Self Training Set", price: 322.18, oldPrice: 999, img: "22498918a.webp", desc: "3 Years+, Promoting family interaction and eye-hand coordination with 2 rackets." },
  { name: "Table Tennis Trainer Wooden - Multicolour", price: 647.46, oldPrice: 1199, img: "15374965a.webp", desc: "5 Years+, Allows you to play table tennis without the restriction of a large table." },
  { name: "Babyhug Disney Spiderman Cricket Set - Size 3 - Red & Yellow", price: 449.04, oldPrice: 799, img: "17529909a.webp", desc: "4 to 6 Years, Complete kit with bat, stumps, and ball for indoor & outdoor play." },
  { name: "JJ Jonex Speed Adjustable Skipping Rope Gym Fitness Workout - Black", price: 117.31, oldPrice: 199, img: "10747582a.webp", desc: "5 Years+, 300 cm, sturdy and durable plastic material for fat burner fitness workout." },
  { name: "Babyhug Marvel Spiderman Wooden Table Tennis Trainer Toy Set", price: 598.97, oldPrice: 1299, img: "19130326a.webp", desc: "5 Years +, Improve your skills and enjoy active play with 2 wooden rackets and 2 balls." },
  { name: "Play Nation Gladiator PVC Cricket Bat Full Size | High Performance", price: 485.46, oldPrice: 899, img: "18966508a.webp", desc: "15 Years+, Durable, lightweight 35-inch PVC bat with strong, comfortable grip." },
  { name: "Wasan Steel Wire Adjustable Skipping Rope - Red Black", price: 428.69, oldPrice: 515, img: "1235366a.webp", desc: "5 to 10 Years, Light weight and easy for building stamina and coordination." },
  { name: "Babyhug 3-In-1 Multi-Activity Playset - Red/White", price: 1799.1, oldPrice: 2999, img: "14520767a.webp", desc: "3 years+, develops balance and coordination with a strong and sturdy multi-sports hoop." }
];

const UNIQUE_TOY_IMG_IDS = ["1532330393533-443990a51d10", "1596461404969-9ae70f2830c1", "1558060370-d644479cb6f7"];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // We will delete products selectively inside the loop to avoid wiping categories we haven't touched yet.
    // await Product.deleteMany({}); // Commented out global delete
    await Review.deleteMany({}); 

    const subCats = await Category.find({ parentCategory: { $ne: null } }).populate('parentCategory');
    const adminUser = await User.findOne({ role: { $in: ['admin', 'super_admin'] } });
    
    if (!adminUser) {
      console.log('⚠️ No admin user found. Please run admin seed first.');
      process.exit(1);
    }

    let globalImgCounter = 0;
    let seededProducts = [];

    const CATEGORY_DATA_MAP = {
      "Soft Toys": SOFT_TOYS_REAL_DATA,
      "Musical Toys": MUSICAL_TOYS_REAL_DATA,
      "Indoor & Outdoor Play": INDOOR_OUTDOOR_REAL_DATA,
      "Learning & Educational Toys": LEARNING_EDUCATION_REAL_DATA,
      "Stacking Toys": STACKING_TOYS_REAL_DATA,
      "Kids Puzzles": KIDS_PUZZLES_REAL_DATA,
      "Baby Rattles": BABY_RATTLES_REAL_DATA,
      "Play Gyms & Playmats": PLAY_GYMS_MATS_REAL_DATA,
      "Sports & Games": SPORTS_GAMES_REAL_DATA,
      // Add more categories here as you provide data
    };

    const COLORS = ['Red', 'Blue', 'Pink', 'Yellow', 'Green', 'Orange', 'Multicolor', 'White', 'Brown'];
    const GENDERS = ['Boy', 'Girl', 'Unisex'];

    for (const sub of subCats) {
      const parent = sub.parentCategory;
      const realData = CATEGORY_DATA_MAP[parent.name];

      if (!realData) {
        console.log(`⏩ Skipping ${sub.name} (No real data provided yet)`);
        continue;
      }

      console.log(`🧹 Clearing old products for: ${sub.name}`);
      await Product.deleteMany({ subcategories: sub._id });

      console.log(`🛍️ Seeding ${realData.length} products for: ${sub.name}`);

      for (let i = 0; i < realData.length; i++) {
        let productName, imgUrl, price, oldPrice, desc;
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const randomGender = GENDERS[Math.floor(Math.random() * GENDERS.length)];

        if (i < realData.length) {
          const item = realData[i];
          productName = `${item.name} (${sub.name})`;
          imgUrl = `https://cdn.fcglcdn.com/brainbees/images/products/219x265/${item.img}`;
          price = item.price;
          oldPrice = item.oldPrice;
          desc = item.desc;
        } else {
          productName = `Premium Toy Edition #${i} (${sub.name})`;
          const imgId = UNIQUE_TOY_IMG_IDS[globalImgCounter % UNIQUE_TOY_IMG_IDS.length];
          imgUrl = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=800`;
          price = PRICES[i % PRICES.length];
          oldPrice = price + 250;
          desc = "High quality toy for child development.";
          globalImgCounter++;
        }

        const product = await Product.create({
          name: productName,
          description: desc,
          shortDescription: `Best quality product in ${sub.name}.`,
          category: parent._id,
          subcategories: [sub._id],
          thumbnail: { url: imgUrl },
          images: [{ url: imgUrl }],
          brand: 'Toyovo',
          price: price,
          oldPrice: oldPrice,
          stock: 100,
          status: 'active',
          ageGroup: '0-10 Years',
          gender: randomGender,
          color: [randomColor],
          material: 'Child-Safe Premium',
          isFeatured: i === 0,
          isTrending: i === 1,
          soldCount: Math.floor(Math.random() * 100)
        });
        
        seededProducts.push(product);
      }
      process.stdout.write('.');
    }

    console.log('\n💬 Seeding Testimonial Reviews...');
    const testimonialData = [
      "The best toy store in India! My kids are obsessed with the musical penguin.",
      "Amazing quality and very fast delivery. Highly recommended for parents.",
      "The soft toys are so cuddly and safe for babies. Great experience!",
      "I love the collection. The Montessori toys are very educational.",
      "Toyovo never disappoints. Premium quality at reasonable prices."
    ];

    for (let i = 0; i < testimonialData.length; i++) {
      const randomProduct = seededProducts[Math.floor(Math.random() * seededProducts.length)];
      await Review.create({
        product: randomProduct._id,
        user: adminUser._id,
        userName: ["Amit Sharma", "Priya Singh", "Rahul Verma", "Anjali Gupta", "Vikram Malhotra"][i],
        rating: 5,
        comment: testimonialData[i],
        role: "Verified Parent",
        status: 'approved'
      });
    }

    console.log('\n\n✨ All data (Products & Reviews) seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();
