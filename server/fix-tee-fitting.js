const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Use the same connection as server
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = "PremierProducts";
const DB_CLUSTER = process.env.DB_CLUSTER || "premierproducts.sz7r7g5";
const DB_APPNAME = process.env.DB_APPNAME || "PremierProducts";

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fixBrassTeeFittingImage() {
  try {
    console.log('🔄 Fixing Brass Tee Fitting image...');
    
    const result = await Product.updateOne(
      { name: 'Brass Tee Fitting' },
      { $set: { image: '/images/products/brass-fitting/brass-fitting-7.png' } }
    );
    
    if (result.modifiedCount > 0) {
      console.log('✅ Updated Brass Tee Fitting image path to .png');
    } else {
      console.log('⚠️ Product not found or already correct');
    }
    
    // Also check what the current image path is
    const product = await Product.findOne({ name: 'Brass Tee Fitting' });
    if (product) {
      console.log(`📸 Current image path: ${product.image}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixBrassTeeFittingImage();
