const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

dotenv.config({ path: '../.env' });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: './.env' });
}

const sampleProducts = [
  {
    name: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)',
    brand: 'Apple',
    description: 'Forged in titanium with groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    price: 485000,
    oldPrice: 510000,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    stock: 15,
    rating: 4.9,
    numReviews: 48,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra (512GB, Titanium Black)',
    brand: 'Samsung',
    description: 'Galaxy AI is here. Epic Galaxy S24 Ultra featuring 200MP camera with Quad Tele System and built-in S Pen.',
    price: 399999,
    oldPrice: 425000,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    stock: 20,
    rating: 4.8,
    numReviews: 36,
    isFeatured: true
  },
  {
    name: 'Xiaomi Redmi Note 13 Pro+ 5G (12GB RAM, 512GB)',
    brand: 'Xiaomi',
    description: '200MP camera with OIS, 120W HyperCharge, curved AMOLED display with 1800 nits peak brightness.',
    price: 139999,
    oldPrice: 149999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    stock: 35,
    rating: 4.7,
    numReviews: 29,
    isFeatured: true
  },
  {
    name: 'Infinix Note 40 Pro 5G (8GB RAM, 256GB)',
    brand: 'Infinix',
    description: '70W All-Round FastCharge 2.0 + 20W Wireless MagCharge, 3D Curved 120Hz AMOLED Display.',
    price: 69999,
    oldPrice: 74999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    stock: 40,
    rating: 4.5,
    numReviews: 18,
    isFeatured: false
  },
  {
    name: 'Apple iPad Air 11-inch M2 (128GB, Space Gray)',
    brand: 'Apple',
    description: 'Freshly redesigned with Liquid Retina display, powered by superfast M2 chip and support for Apple Pencil Pro.',
    price: 185000,
    oldPrice: 195000,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    stock: 10,
    rating: 4.9,
    numReviews: 22,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Tab S9 FE (6GB RAM, 128GB, Gray)',
    brand: 'Samsung',
    description: 'Vibrant 10.9-inch display, IP68 water and dust resistance, bundled S Pen included in the box.',
    price: 124999,
    oldPrice: 135000,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    stock: 12,
    rating: 4.6,
    numReviews: 15,
    isFeatured: false
  },
  {
    name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
    brand: 'Apple',
    description: 'S9 SiP enables double tap gesture, brighter display, faster on-device Siri, and advanced health sensors.',
    price: 132000,
    oldPrice: 140000,
    category: 'Smart Watches',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    stock: 18,
    rating: 4.8,
    numReviews: 31,
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Watch 6 Classic (47mm, Black)',
    brand: 'Samsung',
    description: 'Iconic rotating bezel is back with bigger screen, custom workout routines, and sleep coaching.',
    price: 89999,
    oldPrice: 98000,
    category: 'Smart Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    stock: 22,
    rating: 4.6,
    numReviews: 24,
    isFeatured: false
  },
  {
    name: 'Apple AirPods Pro (2nd Generation with USB-C)',
    brand: 'Apple',
    description: 'Up to 2x more Active Noise Cancellation, Transparency mode, Personalized Spatial Audio with dynamic head tracking.',
    price: 74999,
    oldPrice: 79999,
    category: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    stock: 30,
    rating: 4.9,
    numReviews: 64,
    isFeatured: true
  },
  {
    name: 'Audionic Airbud 550 Wireless TWS Earbuds',
    brand: 'Audionic',
    description: 'Quad mic ENC noise cancellation, low latency gaming mode, touch controls, up to 40 hours battery life.',
    price: 5499,
    oldPrice: 7999,
    category: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    stock: 50,
    rating: 4.4,
    numReviews: 53,
    isFeatured: false
  },
  {
    name: 'Anker 20W PowerPort III USB-C Fast Charger',
    brand: 'Anker',
    description: 'High-speed charging for iPhone and Android devices in an ultra-compact size with MultiProtect safety system.',
    price: 3499,
    oldPrice: 4200,
    category: 'Chargers',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80',
    stock: 60,
    rating: 4.8,
    numReviews: 89,
    isFeatured: false
  },
  {
    name: 'Baseus 65W GaN5 Fast Charger 3-Port (USB-C + USB-A)',
    brand: 'Baseus',
    description: 'Gallium Nitride technology allowing simultaneously fast charging for laptops, tablets, and mobile phones.',
    price: 7999,
    oldPrice: 9500,
    category: 'Chargers',
    image: 'https://images.unsplash.com/photo-1622445268465-843dcb0653df?w=600&auto=format&fit=crop&q=80',
    stock: 45,
    rating: 4.7,
    numReviews: 42,
    isFeatured: false
  },
  {
    name: 'Anker 335 Power Bank (PowerCore 20K, 20W)',
    brand: 'Anker',
    description: '20,000mAh high capacity power bank with USB-C 20W Power Delivery output, charges iPhone 15 up to 4.3 times.',
    price: 11999,
    oldPrice: 13500,
    category: 'Power Banks',
    image: 'https://images.unsplash.com/photo-1609592424083-d5d11568e612?w=600&auto=format&fit=crop&q=80',
    stock: 25,
    rating: 4.8,
    numReviews: 37,
    isFeatured: true
  },
  {
    name: 'Joyroom 10000mAh Magnetic Wireless Power Bank',
    brand: 'Joyroom',
    description: 'Strong magnetic alignment MagSafe power bank with foldable kickstand and 20W fast wired charging.',
    price: 6499,
    oldPrice: 7800,
    category: 'Power Banks',
    image: 'https://images.unsplash.com/photo-1620987278429-ab178d6eb547?w=600&auto=format&fit=crop&q=80',
    stock: 35,
    rating: 4.5,
    numReviews: 21,
    isFeatured: false
  },
  {
    name: 'Spigen Tough Armor Case for iPhone 15 Pro Max',
    brand: 'Spigen',
    description: 'Dual-layer foam technology and TPU protection with built-in kickstand for viewing hands-free.',
    price: 4999,
    oldPrice: 5999,
    category: 'Cases & Covers',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=80',
    stock: 40,
    rating: 4.8,
    numReviews: 45,
    isFeatured: false
  },
  {
    name: 'Nillkin Super Frosted Shield Case for Galaxy S24 Ultra',
    brand: 'Nillkin',
    description: 'Salient dot design, wear-resistant, anti-skidding, dust-proof, anti-fingerprint and easy to clean.',
    price: 2999,
    oldPrice: 3800,
    category: 'Cases & Covers',
    image: 'https://images.unsplash.com/photo-1541877944-ac82a091518a?w=600&auto=format&fit=crop&q=80',
    stock: 55,
    rating: 4.6,
    numReviews: 30,
    isFeatured: false
  },
  {
    name: 'Anker PowerLine III Flow USB-C to Lightning Cable (6ft)',
    brand: 'Anker',
    description: 'Super soft silicone finish feels surprisingly smooth between fingers, withstands 25,000 bends.',
    price: 3899,
    oldPrice: 4500,
    category: 'Cables',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    stock: 70,
    rating: 4.9,
    numReviews: 68,
    isFeatured: false
  },
  {
    name: 'Baseus 100W 6in1 Braided USB-C Fast Charging Cable',
    brand: 'Baseus',
    description: 'Heavy duty nylon braided cable supporting 100W Power Delivery and high speed data transfer.',
    price: 2499,
    oldPrice: 3200,
    category: 'Cables',
    image: 'https://images.unsplash.com/photo-1616440342232-157d2a149601?w=600&auto=format&fit=crop&q=80',
    stock: 80,
    rating: 4.7,
    numReviews: 50,
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/usama_mobiles';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB for seeding at ${mongoUri}`);

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Existing database collections cleared.');

    // Create Admin and Customer Users
    const adminUser = await User.create({
      name: 'Usama Admin',
      email: 'admin@usamamobiles.pk',
      password: 'admin123',
      role: 'admin'
    });

    const customerUser = await User.create({
      name: 'Usama Customer',
      email: 'customer@usamamobiles.pk',
      password: 'customer123',
      role: 'user'
    });

    console.log(`Created Admin User: ${adminUser.email} (password: admin123)`);
    console.log(`Created Customer User: ${customerUser.email} (password: customer123)`);

    // Insert Products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${createdProducts.length} Usama Mobiles products!`);

    // Create a Sample Order
    await Order.create({
      user: customerUser._id,
      items: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          quantity: 1,
          price: createdProducts[0].price,
          image: createdProducts[0].image
        },
        {
          product: createdProducts[10]._id,
          name: createdProducts[10].name,
          quantity: 2,
          price: createdProducts[10].price,
          image: createdProducts[10].image
        }
      ],
      shippingAddress: {
        fullName: 'Usama Customer',
        email: 'customer@usamamobiles.pk',
        phone: '03001234567',
        address: 'Main Boulevard, Gulberg III',
        city: 'Lahore',
        postalCode: '54000',
        country: 'Pakistan'
      },
      subtotal: createdProducts[0].price + (createdProducts[10].price * 2),
      shipping: 0,
      total: createdProducts[0].price + (createdProducts[10].price * 2),
      status: 'Pending'
    });

    console.log('Created sample order for demonstration.');

    console.log('\n--- SEED COMPLETE ---');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
