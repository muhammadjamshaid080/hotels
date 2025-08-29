// db.js
const mongoose = require("mongoose");
require('dotenv').config();

//const mongoURL =process.env.DB_URL_LOCAL;

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL) // Mongoose v7+ me extra options ki zaroorat nahin
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const db = mongoose.connection;

db.on("disconnected", () => console.log("⚠️ MongoDB disconnected"));

module.exports = db; // optional export (agar kahin use karna ho)
