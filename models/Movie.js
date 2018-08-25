const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true},
  genre: {
    type: String,
    required: true,
    validate: {
      validator: (text) => {
        return text.split(', ').every(genre => {
          if (genre.length !== 0)
            return ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"].includes(genre);
          else
            return true
        });
      },
      message: 'genre value should be included in ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"]'
    }
  } ,
  plot: String
});

module.exports = mongoose.model('Movie', movieSchema);