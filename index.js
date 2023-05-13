const express = require("express");
require("./ConnectDB/ConnectDB");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./Config/passport");

const client_route = require("./Routes/Client_Route");
const product_route = require("./Routes/Product_Route");
const order_route = require("./Routes/Order_Route");
const Client = require("./Models/Model_Client");

const dotenv = require("dotenv");
dotenv.config();

// Connexion à la base de données

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());

// Middleware d'authentification Bearer
// see Route we can have an ideas for the secure routes
app.use("/client_api", client_route);
app.use("/product_api", product_route);
app.use("/order", order_route);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
