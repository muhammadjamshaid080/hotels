const express = require("express");
const db = require("./db"); // MongoDB connection file
const bodyParser = require("body-parser");

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

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
