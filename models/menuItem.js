// models/menuItem.js
const mongoose = require("mongoose");

// 1️⃣ Schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
    min: 0,
  },
});

// 2️⃣ Model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// 3️⃣ Export
module.exports = MenuItem;
