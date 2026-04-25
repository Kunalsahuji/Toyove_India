export const countries = [
    { name: 'United States', code: 'US', currency: 'USD' },
    { name: 'India', code: 'IN', currency: 'INR' },
    { name: 'United Kingdom', code: 'GB', currency: 'GBP' },
    { name: 'Canada', code: 'CA', currency: 'CAD' },
    { name: 'Australia', code: 'AU', currency: 'AUD' },
]

export const languages = ['English', 'Hindi', 'French', 'Spanish', 'German']

export const promoMessages = [
  '10% off your next order, use code : TOYOVOINDIA001',
  'Free Shipping On Orders Over ₹999!',
  'New Arrivals Every Week — Shop Now'
]

export const categoryData = {
  'BOY FASHION': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          'Sets & Suits', 'T-Shirts', 'Shorts', 'Onesies & Rompers', 
          'Onesies Multi & Value Packs', 'Nightwear', 'Shirts', 
          'Jeans & Trousers', 'Pajamas & Trackpants', 'Diaper & Bootie Leggings',
          'Party Wear', 'Ethnic Wear', 'Inner Wear', 'Jhablas', 'Vests',
          'Set of Vests & Jhablas', 'Briefs & Boxers', 'Multipacks & Innerwear Sets',
          'Caps & More', 'Socks', 'Swim Wear', 'Bath Time', 'Athleisure & Sportswear',
          'Thermals', 'Sweaters', 'Sweatshirts & Jackets', 'Theme Costumes', 
          'Rainwear', 'Kids Umbrella', { name: 'View All', type: 'link', badge: 'New' }
        ] 
      },
      { 
        title: 'SHOP BY COLLECTION', 
        items: ['Swimming Essentials', 'Multi-packs', 'Bestsellers', 'Baby Essentials'],
        extra: {
          title: 'FASHION ACCESSORIES',
          items: ['Summer Caps & More', 'Sunglasses', 'Watches', 'Smart Watches', 'Ties, Belts & Suspenders', 'Bags', 'Kids Umbrellas']
        }
      },
      { 
        title: 'SHOP BY AGE', 
        items: [
          'Preemie/Tiny Preemie', 'New Born', '0-3 Months', '3-6 Months', 
          '6-9 Months', '9-12 Months', '12-18 Months', '18-24 Months', 
          '2 to 4 Years', '4 to 6 Years', '6 to 8 Years', '8+ Years'
        ],
        extra: {
          title: 'SHOP BY PRICE',
          items: ['All Under 199', 'All Under 299', 'All Under 399', 'All Under 499']
        }
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: [
          'Babyhug', 'Babyoye', 'OLLINGTON ST.', 'Pine Kids', 'Honeyhap', 
          'Mark & Mia', 'Doodle Poodle', 'Primo Gino', 'Kookie Kids', 
          'Carter\'s', 'Earthy Touch', 'Cute Walk', 'Bonfino', 'Arias by Lara Dutta'
        ] 
      }
    ],
    banner: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/19629172a.webp'
  },
  'GIRL FASHION': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          'Frocks & Dresses', 'Sets & Suits', 'Tops & T-shirts', 'Shorts & Skirts', 
          'Jumpsuits & Dungarees', 'Pajamas & Leggings', 'Ethnic Wear', 'Party Wear',
          'Inner Wear', 'Swim Wear', 'Nightwear', 'Socks', 'Bath Time', 'Hair Accessories'
        ] 
      },
      { 
        title: 'SHOP BY COLLECTION', 
        items: ['Bestsellers', 'Multi-packs', 'Beach Wear', 'Birthday Boutique', 'Festive Store'],
        extra: {
          title: 'FASHION ACCESSORIES',
          items: ['Hair Bands', 'Hair Clips', 'Jewellery', 'Bags', 'Sunglasses']
        }
      },
      { 
        title: 'SHOP BY AGE', 
        items: ['New Born', '0-6 Months', '6-12 Months', '1-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years']
      }
    ],
    banner: 'https://images.pexels.com/photos/32328596/pexels-photo-32328596.jpeg'
  },
  'FOOTWEAR': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Flip Flops', 'Clogs', 'Casual Shoes', 'Sandals', 'Booties', 'Sneakers', 'Ballerinas', 'Sports Shoes', 'School Shoes'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Pine Kids', 'Cute Walk', 'Babyhug', 'Crocs', 'Skechers', 'Adidas'] 
      },
      { 
        title: 'DON\'T MISS', 
        items: ['Sock Shoes', 'Stockings & Tights', 'Plush Footwear', 'Jibbitz'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/37052023/pexels-photo-37052023.jpeg'
  },
  'TOYS': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Musical Toys', 'Learning & Educational', 'Soft Toys', 'Indoor & Outdoor Play', 'Blocks & Construction', 'Puzzles'] 
      },
      { 
        title: 'RIDE-ONS & SCOOTERS', 
        items: ['Battery Operated', 'Manual Push', 'Scooters', 'Tricycles', 'Bicycles'] 
      },
      { 
        title: 'BOARD GAMES', 
        items: ['IQ Games', 'Ludo', 'Snakes & Ladders', 'Monopoly'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/27660140/pexels-photo-27660140.jpeg'
  },
  'DIAPERING': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Diaper Pants', 'Taped Diapers', 'Wipes', 'Cloth Nappies', 'Bed Protectors', 'Diaper Bags'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'Huggies', 'Pampers', 'MamyPoko', 'Supples', 'Little\'s'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/3845493/pexels-photo-3845493.jpeg'
  },
  'GEAR': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Strollers & Prams', 'Cots & Cribs', 'High Chairs', 'Walkers', 'Car Seats', 'Bouncers & Rockers'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/3958519/pexels-photo-3958519.jpeg'
  },
  'FEEDING': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Bottles & Nipples', 'Bibs & Hankies', 'Sipper Cups', 'Breast Feeding', 'Baby Food', 'Sterilizers'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg'
  },
  'BATH': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Lotions', 'Oils & Powders', 'Soaps & Body Wash', 'Shampoos', 'Bath Tubs', 'Grooming', 'Bath Towels'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/35979966/pexels-photo-35979966.jpeg'
  },
  'NURSERY': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Cots & Cradles', 'Blankets', 'Bedding Sets', 'Wardrobes', 'Kids Furniture'] 
      }
    ],
    banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/20139636a.webp'
  },
  'MOMS': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Maternity Wear', 'Lingerie', 'Personal Care', 'Lactation Boosters'] 
      }
    ],
    banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/22333906a.webp'
  },
  'HEALTH & SAFETY': {
    content: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Cleansers', 'Oral Care', 'Safety Gear', 'Medical Care'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/31212340/pexels-photo-31212340.jpeg'
  },
  'BOUTIQUES': {
    content: [
      { 
        title: 'SECTIONS', 
        items: ['New Today', 'Bestsellers', 'Featured Brands'] 
      }
    ],
    banner: 'https://images.pexels.com/photos/15170532/pexels-photo-15170532.jpeg'
  }
}

export const mainNavLinks = [
  { name: 'Home', href: '/', hideOnDesktop: true },
  { name: 'About', href: '/about', hideOnDesktop: true },
  { 
    name: 'ALL CATEGORIES', 
    href: '/all-categories', 
    mega: {
      type: 'master',
      sidebar: [
        { name: 'BOY FASHION', id: 'boy-fashion' },
        { name: 'GIRL FASHION', id: 'girl-fashion' },
        { name: 'FOOTWEAR', id: 'footwear' },
        { name: 'TOYS', id: 'toys' },
        { name: 'DIAPERING', id: 'diapering' },
        { name: 'GEAR', id: 'gear' },
        { name: 'FEEDING', id: 'feeding' },
        { name: 'BATH', id: 'bath' },
        { name: 'NURSERY', id: 'nursery' },
        { name: 'MOMS', id: 'moms' },
        { name: 'HEALTH & SAFETY', id: 'health' },
        { name: 'BOUTIQUES', id: 'boutiques' }
      ]
    }
  },
  { 
    name: 'BOY FASHION', 
    href: '/collections/boy-fashion', 
    mega: categoryData['BOY FASHION']
  },
  { 
    name: 'GIRL FASHION', 
    href: '/collections/girl-fashion', 
    mega: categoryData['GIRL FASHION']
  },
  { 
    name: 'FOOTWEAR', 
    href: '/collections/footwear', 
    mega: categoryData['FOOTWEAR']
  },
  { 
    name: 'TOYS', 
    href: '/collections/toys', 
    mega: categoryData['TOYS']
  },
  { 
    name: 'DIAPERING', 
    href: '/collections/diapering', 
    mega: categoryData['DIAPERING']
  },
  { 
    name: 'GEAR', 
    href: '/collections/gear', 
    mega: categoryData['GEAR']
  },
  { 
    name: 'FEEDING', 
    href: '/collections/feeding', 
    mega: categoryData['FEEDING']
  },
  { 
    name: 'BATH', 
    href: '/collections/bath', 
    mega: categoryData['BATH']
  },
  { 
    name: 'NURSERY', 
    href: '/collections/nursery', 
    mega: categoryData['NURSERY']
  },
  { 
    name: 'MOMS', 
    href: '/collections/moms', 
    mega: categoryData['MOMS']
  },
  { 
    name: 'HEALTH & SAFETY', 
    href: '/collections/health-safety', 
    mega: categoryData['HEALTH & SAFETY']
  },
  { 
    name: 'BOUTIQUES', 
    href: '/collections/boutiques', 
    mega: categoryData['BOUTIQUES']
  },
  { name: 'Contact', href: '/contact', hideOnDesktop: true }
]
