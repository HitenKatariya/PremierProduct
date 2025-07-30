const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    lastLogin: { type: Date, default: null }
  },
  { timestamps: true }
);

// No pre-save hook
// No bcrypt comparison

module.exports = mongoose.model("User", userSchema);
