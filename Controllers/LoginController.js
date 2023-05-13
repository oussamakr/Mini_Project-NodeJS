const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Client = require("../Models/Model_Client");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Route pour le register

// Route pour le login
exports.Login_client = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Recherchez le client dans la base de données en utilisant l'email
    const client = await Client.findOne({ email: email });
    console.log(client);
    if (!client) {
      return res.status(401).json({ message: "Authentification échouée" });
    }

    // Vérifiez si le mot de passe correspond
    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Authentification échouée" });
    }

    // Générez le jeton JWT
    const token = jwt.sign(
      { clientId: client._id },
      process.env.YOUR_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const save_info = await Client.findByIdAndUpdate(
      client._id,
      { token: token },
      { new: true }
    );
    // Renvoyer le jeton JWT dans la réponse
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
