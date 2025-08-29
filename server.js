const express = require("express");
const db = require("./db"); // MongoDB connection file
const bodyParser = require("body-parser");
require('dotenv').config();

// Models
const MenuItem = require("./models/menuItem");
const Card = require("./models/card");

// Routes
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("Hello World ✅ Server is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    url: req.originalUrl,
  });
});

const PORT= process.env.PORT || 3000;
// Start server
app.listen (PORT, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
