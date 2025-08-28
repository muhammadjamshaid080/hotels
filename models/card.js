// models/card.js
const mongoose = require("mongoose");

// ✅ Card Schema
const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{12,19}$/  // 12–19 digits typical card numbers
  },
  cardHolder: {
    type: String,
    required: true,
    trim: true
  },
  expiryDate: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])\/\d{2}$/  // MM/YY format
  },
  cvv: {
    type: String,
    required: true,
    match: /^[0-9]{3,4}$/ // 3 or 4 digits
  },
  balance: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Model
const Card = mongoose.model("Card", cardSchema);

// ✅ Export
module.exports = Card;
