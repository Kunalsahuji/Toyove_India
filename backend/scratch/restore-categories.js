import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Category from '../src/models/Category.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const CATEGORY_STRUCTURE = [
  { name: "Musical Toys", showInNavbar: true, subs: ["Pianos & Keyboards", "Drums & Percussion", "Guitars", "Xylophones", "Microphones", "Musical Sets"] },
  { name: "Learning & Educational Toys", showInNavbar: false, subs: ["STEM Kits", "Flash Cards", "Science Kits", "Alphabet Toys", "Math Toys", "Globes"] },
  { name: "Soft Toys", showInNavbar: true, subs: ["Teddy Bears", "Plush Animals", "Character Plushes", "Giant Soft Toys", "Soft Pillows", "Baby Comforters"] },
  { name: "Indoor & Outdoor Play", showInNavbar: true, subs: ["Tents", "Tunnels", "Ball Pits", "Garden Slides", "Basketball Hoops", "Bouncy Castles"] },
  { name: "Play Gyms & Playmats", showInNavbar: false, subs: ["Baby Gyms", "Interlocking Mats", "Musical Playmats", "Foldable Mats", "Activity Gyms"] },
  { name: "Sports & Games", showInNavbar: false, subs: ["Cricket Sets", "Football", "Badminton", "Skating Gear", "Bowling Sets", "Archery Kits"] },
  { name: "Role & Pretend Play Toys", showInNavbar: false, subs: ["Kitchen Sets", "Play Foods", "Kids' Doctor Sets", "Beauty Salon", "Engineer Tools"] },
  { name: "Blocks & Construction Sets", showInNavbar: false, subs: ["Building Blocks", "Magnetic Tiles", "Logo Style Blocks", "Wooden Blocks", "Architecture Sets"] },
  { name: "Stacking Toys", showInNavbar: true, subs: ["Stacking Rings", "Nestling Cups", "Geometric Stackers", "Wooden Stackers", "Animal Stackers"] },
  { name: "Kids Puzzles", showInNavbar: true, subs: ["Jigsaw Puzzles", "3D Puzzles", "Wooden Puzzles", "Floor Puzzles", "Shape Sorters", "Alphabet Puzzles"] },
  { name: "Baby Rattles", showInNavbar: false, subs: ["Hand Rattles", "Wrist Rattles", "Teether Rattles", "Musical Rattles", "Plush Rattles"] },
  { name: "Toys Cars Trains & Vehicles", showInNavbar: false, subs: ["Die-cast Cars", "Train Sets", "Trucks", "Planes", "Remote Control Cars", "Track Sets"] },
  { name: "Dolls & Dollhouses", showInNavbar: false, subs: ["Fashion Dolls", "Dollhouses", "Baby Dolls", "Doll Accessories", "Miniature Furniture"] },
  { name: "Push & Pull Along Toys", showInNavbar: false, subs: ["Wooden Push Toys", "Pull Along Animals", "Walkers", "Wagons", "Activity Walkers"] },
  { name: "Art Crafts & Hobby Kits", showInNavbar: false, subs: ["DIY Kits", "Painting Sets", "Clay Kits", "Jewelry Making", "Coloring Books", "Sketching Kits"] },
  { name: "Board Games", showInNavbar: false, subs: ["IQ Games", "Ludo, Snakes & Ladders", "Words, Pictures & Scrabble Games", "Playing Cards", "Life & Travel Board Games", "Animal, Birds & Marine Life Games", "Business/Monopoly"] },
  { name: "Action Figures & Collectibles", showInNavbar: false, subs: ["Superheroes", "Anime Figures", "Dinosaurs", "Robot Figures", "Collectible Cards"] },
  { name: "Radio & Remote Control Toys", showInNavbar: false, subs: ["RC Cars", "Drones", "RC Helicopters", "RC Robots", "Boat Toys"] },
  { name: "Bath Toys", showInNavbar: false, subs: ["Rubber Ducks", "Water Squirters", "Bath Boats", "Bubble Makers", "Floating Toys"] },
  { name: "Toys Guns & Weapons", showInNavbar: false, subs: ["Foam Blasters", "Water Guns", "Laser Tags", "Sword Toys", "Shield Sets"] },
  {
    name: "RIDE-ONS & SCOOTERS",
    showInNavbar: false,
    subs: [
      "Battery Operated Ride-ons",
      "Manual Push Ride-ons",
      "Swing cars/twisters",
      "Scooters",
      "Rocking Ride Ons",
      "Tricycles",
      "Bicycles",
      "Balance Bike"
    ]
  },
  {
    name: "HOME PLAY ACTIVITIES",
    showInNavbar: false,
    subs: [
      "Play Dough, Sand & Moulds",
      "Coloring, Sequencing & Engraving Art",
      "Activity Kit",
      "Building Construction Sets",
      "Multi Model Making Sets",
      "Home Kitchen Sets", // Changed to avoid duplicate slug
      "Home Play Foods",
      "Home Doctor Sets",
      "Home Piano & Keyboards",
      "Home Drum Sets"
    ]
  }
];

const IMAGES = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
  "https://images.unsplash.com/photo-1559454403-b8fb88521f11",
  "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
  "https://images.unsplash.com/photo-1515488764276-beab7607c1e6"
];

async function restore() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Cleaning database (Categories & Products)...');
    await mongoose.connection.db.collection('categories').deleteMany({});
    await mongoose.connection.db.collection('products').deleteMany({});

    for (let i = 0; i < CATEGORY_STRUCTURE.length; i++) {
      const data = CATEGORY_STRUCTURE[i];
      const imgUrl = `${IMAGES[i % IMAGES.length]}?auto=format&fit=crop&q=80&w=800`;

      // Create Parent
      const parent = await Category.create({
        name: data.name,
        bannerImage: { url: imgUrl, alt: data.name },
        showInNavbar: data.showInNavbar,
        showInAllCategories: true,
        isActive: true,
        sortOrder: i
      });
      console.log(`📂 [${i+1}] Created: ${parent.name}`);

      // Create Subcategories
      for (const subName of data.subs) {
        try {
          await Category.create({
            name: subName,
            parentCategory: parent._id,
            showInNavbar: false,
            showInAllCategories: true,
            isActive: true,
            level: 1
          });
          process.stdout.write('.');
        } catch (err) {
          if (err.code === 11000) {
            // Duplicate slug, skip or create unique
            console.log(`\n⚠️ Skipping duplicate subcategory: ${subName}`);
          } else {
            throw err;
          }
        }
      }
      console.log(`\n✅ Finished ${parent.name}`);
    }

    console.log('\n✨ Database Reset & Categories Restored Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Restoration Failed:', error);
    process.exit(1);
  }
}

restore();
