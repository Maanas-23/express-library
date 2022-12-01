const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  imprint: { type: String },

  status: {
    type: String,
    required: true,
    enum: ["Available", "Loaned", "Reserved", "Maintenance"],
    default: "Maintenance",
  },

  due_date: { type: Date, default: Date.now() },
});

BookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
