require('dotenv').config();

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const cloudinary = require('./config/cloudinary');

// Build MongoDB connection URI (same pattern as server.js)
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME || 'PremierProducts';
const DB_CLUSTER = process.env.DB_CLUSTER || 'premierproducts.sz7r7g5';
const DB_APPNAME = process.env.DB_APPNAME || 'PremierProducts';

const mongoURI = process.env.MONGODB_URI ||
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`;

async function connectDB() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  });
  console.log('✅ MongoDB connected for seedproducts');
}

function inferCategory(name) {
  const lower = name.toLowerCase();

  if (lower.includes('cable') || lower.includes('gland') || lower.includes('lug') || lower.includes('earthing')) {
    return 'cable gland accessories';
  }
  if (lower.includes('insert') || lower.includes('bushing') || lower.includes('plug') || lower.includes('adapter')) {
    return 'brass insert';
  }
  if (lower.includes('panumatic') || lower.includes('nozzle') || lower.includes('hose') || lower.includes('connector') || lower.includes('valve')) {
    return 'panumatic part';
  }
  if (lower.includes('gauge') || lower.includes('thermowell') || lower.includes('sensor') || lower.includes('pressure') || lower.includes('temperature')) {
    return 'pressure gauge parts';
  }
  if (lower.includes('air conditioner') || lower.includes('refrigerator') || lower.includes('swimming pool')) {
    return 'Air Conditioners and Refigeration Parts';
  }

  return 'brass fitting';
}

async function uploadAndSeed() {
  try {
    await connectDB();

    const imagesDir = path.join(__dirname, 'images');
    const allFiles = fs.readdirSync(imagesDir);
    const imageFiles = allFiles.filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));

    if (!imageFiles.length) {
      console.log('⚠️ No image files found in server/images');
      process.exit(0);
    }

    console.log(`📸 Found ${imageFiles.length} image files. Starting upload to Cloudinary...`);

    const folder = process.env.CLOUDINARY_FOLDER || 'premier-products';

    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const baseName = path.basename(file, path.extname(file));
      const name = baseName.trim();
      const category = inferCategory(name);

      console.log(`\n⬆️ Uploading: ${file} as product "${name}" (category: ${category})`);

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const productData = {
        name,
        description: `${name} - Premier Products`,
        price: 100,
        category,
        image: uploadResult.secure_url,
        inStock: true,
        stockQuantity: 100,
        isActive: true,
      };

      const saved = await Product.findOneAndUpdate(
        { name },
        { $set: productData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`✅ Seeded product: ${saved.name} (Cloudinary URL: ${saved.image})`);
    }

    console.log('\n🎉 Seeding complete! Products are available in MongoDB with Cloudinary image URLs.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

uploadAndSeed();
