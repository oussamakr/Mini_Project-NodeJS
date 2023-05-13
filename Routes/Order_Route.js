const express = require("express");
const Route = express.Router();
const passport = require("../Config/passport");
const {
  Creat_Order,
  Get_OrderList,
  Get_OrderDetails,
} = require("../Controllers/OrderController");
const Secure_Route = passport.authenticate("bearer", { session: false });
// creat , get orders
Route.post("/creat_order", Creat_Order);
Route.get("/Get_order_list", Secure_Route, Get_OrderList);
Route.get("/Get_order_details/:orderId", Get_OrderDetails);

module.exports = Route;
