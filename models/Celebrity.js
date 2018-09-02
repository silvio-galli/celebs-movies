const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  occupation: { type: String, enum: [ "movie star", "singer", "comedian", "unknown" ] },
  catchPhrase: String,
  pictureUrl: {type: String, default: "/images/celebrity.jpg"}
})

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;