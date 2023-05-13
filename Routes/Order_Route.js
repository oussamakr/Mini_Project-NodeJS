const express = require("express");
const Route = express.Router();
const {
  Creat_Order,
  Get_OrderList,
  Get_OrderDetails,
} = require("../Controllers/OrderController");

// creat , get orders
Route.post("/creat_order", Creat_Order);
Route.get("/Get_order_list", Get_OrderList);
Route.get("/Get_order_details/:orderId", Get_OrderDetails);

module.exports = Route;
