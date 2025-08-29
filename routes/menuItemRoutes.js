const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/menuItem");


// 🔹 POST new Menu Item
router.post("/", async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json({
      message: "Menu item saved successfully!",
      data: savedMenuItem,
    });
  } catch (error) {
    console.error("❌ Error saving menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 GET all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 GET menu items by taste
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste.toLowerCase(); // ensure lowercase
    const menuItems = await MenuItem.find({ taste: tasteType });

    if (menuItems.length === 0) {
      return res
        .status(404)
        .json({ message: `No menu items found with taste: ${tasteType}` });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("❌ Error fetching menu items by taste:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 UPDATE Menu Item by ID
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item updated successfully!",
      data: updatedMenuItem,
    });
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 DELETE Menu Item by ID
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenuItem = await MenuItem.findByNameAndDelete(menuId);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      message: "Menu item deleted successfully!",
      data: deletedMenuItem,
    });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// commit add router
module.exports = router;
