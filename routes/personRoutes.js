const express = require("express");
const router = express.Router();
const Person = require("../models/person");  // 👈 fixed path

// Create Person (POST)
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();

    res.status(201).json({
      message: "Person saved successfully!",
      name: savedPerson.name,
      age: savedPerson.age,
      data: savedPerson
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Persons (GET)
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Persons by workType (GET)
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType.toLowerCase();

    if (!["chief", "manager", "waiter", "chief manager"].includes(workType)) {
      return res.status(404).json({ error: "Invalid work type" });
    }

    const persons = await Person.find({ work: workType });
    if (persons.length === 0) {
      return res.status(404).json({ error: "No persons found" });
    }

    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Update Person by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,          // return updated document
        runValidators: true // validate schema rules
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("✅ Person updated successfully!");
    res.status(200).json(updatedPerson);

  } catch (err) {
    console.error("❌ Error updating person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete Person by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("🗑️ Person deleted successfully!");
    res.status(200).json({
      message: "Person deleted successfully",
      data: deletedPerson
    });

  } catch (err) {
    console.error("❌ Error deleting person:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
