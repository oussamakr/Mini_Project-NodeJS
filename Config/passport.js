const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Client = require("../Models/Model_Client"); // Importez votre modèle de client

passport.use(
  new BearerStrategy((token, done) => {
    try {
      const decoded = jwt.verify(token, process.env.YOUR_SECRET_KEY);

      Client.findById(decoded.clientId)

        .then((client) => {
          if (!client) return done(null, false);
          return done(null, client, { scope: "all" });
        })
        .catch((error) => {
          return done(error);
        });
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
