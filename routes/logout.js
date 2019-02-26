var express = require("express");
var router = express.Router();

router.get("/logout", function(req, res) {
  req.logout();
  console.log("logged out");
});

module.exports = router;
