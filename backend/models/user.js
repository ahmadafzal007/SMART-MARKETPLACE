const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String, // Format: "DD/MM/YY"
    match: [/^\d{2}\/\d{2}\/\d{2}$/, "DOB must be in DD/MM/YY format"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phoneNumber: {
    type: String,
    match: [/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"],
  },
  description: {
    type: String,
    maxlength: 500,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
