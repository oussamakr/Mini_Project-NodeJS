const express = require("express");
const Route = express.Router();

const {
  Handel_New_product,
  Get_product_Id,
  Get_All_product,
  Updat_product,
  Delete_product,
} = require("../Controllers/ProductController");

Route.post("/add_product", Handel_New_product);
Route.get("/get_id_product/:id", Get_product_Id);
Route.get("/get_product", Get_All_product);
Route.put("/updat_product/:id", Updat_product);
Route.delete("/delete_product/:id", Delete_product);

module.exports = Route;
