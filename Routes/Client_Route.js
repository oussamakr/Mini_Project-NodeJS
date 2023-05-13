const express = require("express");
const Route = express.Router();
const passport = require("../Config/passport");

const {
  Handel_New_client,
  Get_Client_Id,
  Updat_client,
  Delete_client,
  Get_All_client,
} = require("../Controllers/ClientController");

const { Login_client } = require("../Controllers/LoginController");

const Secure_Route = passport.authenticate("bearer", { session: false });

//login & register client
Route.post("/add_client", Handel_New_client);
Route.post("/login", Login_client);

// crud Client
Route.get("/get_id_client/:id", Secure_Route, Get_Client_Id);
Route.get("/get_client", Secure_Route, Get_All_client);
Route.put("/updat_client/:id", Secure_Route, Updat_client);
Route.delete("/delete_client/:id", Secure_Route, Delete_client);

module.exports = Route;
