const mongoose = require("mongoose");
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual to get Author's full name
AuthorSchema.virtual("name").get(function () {
  if (this.first_name && this.family_name) {
    return this.family_name + ", " + this.first_name;
  } else {
    return "";
  }
});

AuthorSchema.virtual('lifespan').get(function () {
  const birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  if (this.date_of_death) {
    const death = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    return birth + ' - ' + death;
  } else {
    return birth + ' - Present';
  }
});

// Virtual to get Author's url
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
