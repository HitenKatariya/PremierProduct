const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/PremierProducts")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return clearUsers();
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

async function clearUsers() {
  try {
    const result = await User.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} users from database`);
    console.log("✅ Database is now clean - ready for fresh testing!");
    
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error clearing users:", error);
    mongoose.connection.close();
  }
}
