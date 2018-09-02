const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema(
  {
    _celebrity: { type: Schema.Types.ObjectId, ref: "Celebrity" },
    _movie: { type: Schema.Types.ObjectId, ref: "Movie" }
  },
  { 
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at'
     }
  });

module.exports = mongoose.model("Actor", actorSchema);