const express = require("express");

const {
  Handel_New_client,
  Get_Client_Id,
  Updat_client,
  Delete_client,
  Get_All_client,
} = require("../Controllers/ClientController");
const {
  Creat_Order,
  Get_OrderList,
  Get_OrderDetails,
} = require("../Controllers/OrderController");
const { Login_client } = require("../Controllers/LoginController");
const Route = express.Router();

// Crud Client
Route.post("/add_client", Handel_New_client);
Route.get("/get_id_client/:id", Get_Client_Id);
Route.get("/get_client", Get_All_client);
Route.put("/updat_client/:id", Updat_client);
Route.delete("/delete_client/:id", Delete_client);

// creat , get orders
Route.post("/creat_order/", Creat_Order);
Route.get("/Get_order_list/", Get_OrderList);
Route.get("/Get_order_details/:orderId", Get_OrderDetails);

//login client
Route.post("/login", Login_client);

module.exports = Route;
