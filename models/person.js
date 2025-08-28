const mongoose = require("mongoose");

// 1️⃣ Schema banate hain
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  city: {
    type: String,
    default: "Unknown",
  },
  work: {
    type: String,
    enum: ["chief", "manager", "waiter"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10,15}$/, // 10–15 digits only
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email regex
  }
}, { timestamps: true });  // 👈 yahan closing bracket lagao schema ke liye

// 2️⃣ Model
const Person = mongoose.model("Person", personSchema);

// 3️⃣ Export
module.exports = Person;
