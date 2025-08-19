const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Only alphabets (a-z, A-Z)
          return /^[a-zA-Z]+$/.test(v);
        },
        message: props => `Username '${props.value}' is invalid. Only alphabets are allowed.`
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Must start with a letter and end with @gmail.com
          return /^[a-zA-Z][\w\.\-]*@gmail\.com$/.test(v);
        },
        message: props =>
          `Email '${props.value}' is invalid. It must start with a letter and end with '@gmail.com'.`
      }
    },
    password: { type: String, required: true, minlength: 6 },
    lastLogin: { type: Date, default: null }
  },
  { timestamps: true }
);

// No pre-save hook
// No bcrypt comparison

module.exports = mongoose.model("User", userSchema);
