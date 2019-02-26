const express = require("express");
const passport = require("passport");

const User = require("../models/user");
const router = express.Router();

router.post(
  "/signup",
  function(req, res, next) {
    var username = req.body.payload.username;
    var password = req.body.payload.password;

    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User already exists");
        return res.status(400);
      }

      var newUser = new User({
        username: username,
        password: password
      });
      newUser.save(next);
    });
  },
  passport.authenticate("login")
);

module.exports = router;
