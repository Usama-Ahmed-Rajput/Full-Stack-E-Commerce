const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri = 'mongodb://127.0.0.1:27017/usama_mobiles';

  try {
    const conn = await mongoose.connect(primaryUri || fallbackUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (primaryError) {
    console.error(`MongoDB Primary Connection Error: ${primaryError.message}`);

    if (primaryUri && primaryUri !== fallbackUri) {
      console.log('Attempting local MongoDB fallback connection (127.0.0.1:27017)...');
      try {
        const conn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 3000
        });
        console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error(`Local Fallback Connection Error: ${fallbackError.message}`);
      }
    }

    console.error('\n======================================================');
    console.error('⚠️  MONGODB ATLAS IP WHITELIST REQUIRED:');
    console.error('1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com/');
    console.error('2. Click "Network Access" under Security in left menu.');
    console.error('3. Click "+ Add IP Address".');
    console.error('4. Click "ALLOW ACCESS FROM ANYWHERE" (IP: 0.0.0.0/0).');
    console.error('5. Click "Confirm" and wait 1 minute for settings to apply.');
    console.error('======================================================\n');

    process.exit(1);
  }
};

module.exports = connectDB;
