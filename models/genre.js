const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, min: 3, max: 100 },
});

// Virtual to get Genre's url
GenreSchema.virtual("url").get(function () {
  return `/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);