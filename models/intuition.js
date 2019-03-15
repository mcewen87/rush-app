var mongoose = require("mongoose");

var intuitionSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

var Intuition = mongoose.model("Intuition", intuitionSchema);

module.exports = { Intuition };
