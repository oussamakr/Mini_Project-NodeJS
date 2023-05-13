const mongoose = require("mongoose");
const Product = require("../Models/Model_Product");
const Client = require("../Models/Model_Client");

const orderSchema = new mongoose.Schema({
  totalSalePrice: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
