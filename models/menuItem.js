const mongoose = require("mongoose");

//Define the Menu Schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
    default: 0,
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

//Create a menu model:
const menuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = menuItem;
