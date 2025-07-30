const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/PremierProducts")
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return checkUsers();
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

async function checkUsers() {
  try {
    const users = await User.find({});
    console.log(`\n📊 Total users in database: ${users.length}`);
    
    if (users.length > 0) {
      console.log("\n👥 Existing users:");
      users.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Username: ${user.username}, ID: ${user._id}`);
      });
      
      console.log("\n🗑️  Do you want to clear all users? (This will help test fresh registration)");
      console.log("Run: node clearDB.js");
    } else {
      console.log("\n✅ No users found - database is clean for testing");
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error checking users:", error);
    mongoose.connection.close();
  }
}
