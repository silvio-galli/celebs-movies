const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true},
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
});

module.exports = mongoose.model('Movie', movieSchema);