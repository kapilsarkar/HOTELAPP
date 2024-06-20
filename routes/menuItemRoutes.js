const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/menuItem");

//GET method for menu :
router.get("/", async (req, res) => {
  try {
    // Use the Mongoose model to fetch all menuItems from the database
    const data = await MenuItem.find();
    console.log("Menu Data Fetched Successfully");

    // Send the list of menuItems as a JSON response
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "MenuItems cannot be fetched" });
  }
});

//POST method for menu :
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    //Create a newMenu document using Mongoose model
    const newMenu = new MenuItem(data);

    //Save the newMenu data to the database
    const response = await newMenu.save();
    console.log("Menu Data Saved");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
});

//Parameterized GET Method API for the Menu Item on the Basis of taste Type via using Express Router :

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Menu Data Fetched According to Taste");
      res.status(200).json(response);
    } else {
      res.status(404).json({ Error: "Invalid Taste Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//PUT Method API to update the MenuItem Records
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
    const updatedMenuData = req.body; // Updated data for the Menu Item

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, //Return the updated document
      runValidators: true, //Run Mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "Menu Not Found" });
    }
    console.log("Menu Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE Method API to delete the MenuItem Records
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter

    // Assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "Menu Not Found" });
    }

    console.log("Menu Data Deleted");
    res.status(200).json({ message: "Menu Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
