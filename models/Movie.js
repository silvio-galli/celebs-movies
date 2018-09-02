const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    // genre will be an array of strings
    // and every string must be validated
    // it should be included in ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"] array
    genre: [
      {
        type: String,
        required: true,
        validate: {
          validator: (text) => {
              return ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"].includes(text);

          },
          message: 'genre value should be included in ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"]'
        }
      }
    ],
    plot: String
  },
  { 
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at'
     }
  }
);

module.exports = mongoose.model('Movie', movieSchema);