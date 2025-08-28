// db.js
const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/hotels"; // 'mangodb' nahi, 'mongodb'; 127.0.0.1 is safe

mongoose.connect(mongoURL) // Mongoose v7+ me extra options ki zaroorat nahin
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const db = mongoose.connection;

db.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));

module.exports = db; // optional export (agar kahin use karna ho)
