const express = require("express");
const passport = require("passport");

const User = require("../models/user");
const router = express.Router();

router.post("/login", passport.authenticate("login"), (req, res) => {
  console.log(req.body);
});

module.exports = router;
