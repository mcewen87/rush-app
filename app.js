// => SET UP IMPORTS AND INITIALIZE
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dbPath = require("./config").dbConnect;
const router = require("./router");
const app = express();

// => DATABASE CONNECTION
mongoose.connect(dbPath, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// => SETUP APPLICATION MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
router(app);

// => SEND REACT APPLICATION WITH * FOR WILDCARD ENDPOINTS
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// => SETUP SERVER ON LOCAL PORT
app.listen(3001, () => {
  console.log("bleh, i'm alive");
});

module.exports = app;
