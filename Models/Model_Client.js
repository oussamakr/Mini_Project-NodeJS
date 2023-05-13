const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "CLIENT" },
  token: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
