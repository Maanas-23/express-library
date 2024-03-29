const mongoose = require("mongoose");

const { DateTime } = require("luxon");

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

BookInstanceSchema.virtual('due_date_formatted').get(function () {
  return DateTime.fromJSDate(this.due_date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
