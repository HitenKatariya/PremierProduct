require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

// Build MongoDB Atlas URI using env variables
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = "PremierProducts";
const DB_CLUSTER = process.env.DB_CLUSTER || "premierproducts.sz7r7g5";
const DB_APPNAME = process.env.DB_APPNAME || "PremierProducts";

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APPNAME}`;

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'Kalpeshbhai@gmail.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin already exists');
      process.exit(0);
    }

    // Create the admin user
    const adminData = {
      name: 'Kalpesh Bhai',
      email: 'Kalpeshbhai@gmail.com',
      password: 'KalpeshP@123',
      role: 'superadmin',
      isActive: true
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: Kalpeshbhai@gmail.com');
    console.log('🔐 Password: KalpeshP@123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();