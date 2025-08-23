const mongoose = require('mongoose');
const Product = require('./models/Product');

// MongoDB Atlas connection
const DB_USER = "paramrk2005";
const DB_PASS = "EC02pock5bZe8Jdh";
const DB_NAME = "PremierProducts";
const DB_CLUSTER = "premierproducts.sz7r7g5";
const DB_APPNAME = "PremierProducts";

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`;

async function fixCableGlandImages() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Products that need image path fixes based on actual file extensions
    const imageFixes = [
      // Cable gland accessories with .JPG (uppercase) files
      { 
        name: "Double Compression Gland (NPT2)", 
        currentPath: "/images/products/cable-gland-accessories/cable-gland-3.jpg",
        correctPath: "/images/products/cable-gland-accessories/cable-gland-3.JPG" 
      },
      { 
        name: "Double Compression Gland (NPT3)", 
        currentPath: "/images/products/cable-gland-accessories/cable-gland-4.jpg",
        correctPath: "/images/products/cable-gland-accessories/cable-gland-4.JPG" 
      },
      { 
        name: "Double Compression Gland", 
        currentPath: "/images/products/cable-gland-accessories/cable-gland-5.jpg",
        correctPath: "/images/products/cable-gland-accessories/cable-gland-5.JPG" 
      },
      { 
        name: "Single Compression Gland (M40-2)", 
        currentPath: "/images/products/cable-gland-accessories/cable-gland-8.jpg",
        correctPath: "/images/products/cable-gland-accessories/cable-gland-8.JPG" 
      },
      { 
        name: "Single Compression Gland", 
        currentPath: "/images/products/cable-gland-accessories/cable-gland-9.jpg",
        correctPath: "/images/products/cable-gland-accessories/cable-gland-9.JPG" 
      }
    ];

    console.log('\n🔧 Fixing cable gland accessories image paths...');
    
    for (const fix of imageFixes) {
      const result = await Product.updateOne(
        { name: fix.name, image: fix.currentPath },
        { image: fix.correctPath }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`✅ Fixed ${fix.name}: .jpg → .JPG`);
      } else {
        console.log(`⚠️  ${fix.name}: No changes made (might already be correct)`);
      }
    }

    // Verify the updates
    console.log('\n📋 Checking updated cable gland accessories:');
    const cableGlandProducts = await Product.find({
      category: 'cable gland accessories'
    }).select('name image');

    cableGlandProducts.forEach(product => {
      const extension = product.image.split('.').pop();
      const status = ['JPG', 'png'].includes(extension) ? '✅' : '❌';
      console.log(`${status} ${product.name}: ${product.image}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

fixCableGlandImages();
