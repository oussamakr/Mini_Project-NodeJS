const express = require("express");
const passport = require("../Config/passport");
const Route = express.Router();
const {
  Handel_New_product,
  Get_product_Id,
  Get_All_product,
  Updat_product,
  Delete_product,
} = require("../Controllers/ProductController");
const Secure_Route = passport.authenticate("bearer", { session: false });
Route.post("/add_product", Secure_Route, Handel_New_product);
Route.get("/get_id_product/:id", Secure_Route, Get_product_Id);
Route.get("/get_product", Secure_Route, Get_All_product);
Route.put("/updat_product/:id", Secure_Route, Updat_product);
Route.delete("/delete_product/:id", Secure_Route, Delete_product);

module.exports = Route;
