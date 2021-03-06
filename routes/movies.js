var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require("../models/Celebrity");
const Actor = require("../models/Actor");
const mongoose = require("mongoose");

const genres = [
  {genre: "action", selected: false},
  {genre: "adventure", selected: false},
  {genre: "comedy", selected: false},
  {genre: "doc", selected: false},
  {genre: "drama", selected: false},
  {genre: "fantasy", selected: false},
  {genre: "romantic", selected: false},
  {genre: "science-fiction", selected: false},
];


// GET /movies
router.get('/', function(req, res, next) {
  if (req.query && req.query.filter) {
    Movie.find({ "genre": { $in: [ req.query.filter ] } })
  .then( movies => {
    res.render('movies/index', {
      movies,
      "genres": genres.map( item => {
        item.selected = item.genre === req.query.filter ? true : false;
        return item;
      })
    });
  })
  .catch( err => { throw err });  
  }
  Movie.find()
  .then( movies => {
    res.render('movies/index', { movies, genres });
  })
  .catch( err => { throw err });
});


// GET /movies/new
router.get('/new', (req, res) => {
  Celebrity.find({"occupation": "movie star"}).sort({ "lastName": 1 }).then( actors => {
    res.render('movies/new', { actors });
  })
});


// GET /movies/create
router.get('/create', (req, res) => {
  console.log( "REQ QUERY -->", req.query )
  let title = req.query.title;
  let plot =  req.query.plot;
  let genre = req.query.genre.match(/\b\w+\b/g);
  let cast = req.query.cast;

  let movie = new Movie({
    title, plot, genre
  })

  let actors = cast.map( value => {
    let actor = new Actor({
      _movie: movie._id,
      _celebrity: mongoose.Types.ObjectId(value)
    })
    return actor.save();
  })
  Promise.all([movie.save(), ...actors])
  .then( results => {
    let [ newMovie, ...actors ] = results;
    console.log( "RESULTS new movie", results );
    res.redirect('/movies/' + newMovie._id.toString());
  })
  .catch( err => { throw err });
});


// GET /movies/:id
router.get('/:id', (req, res) => {
  let movieId = req.params.id;
  Movie.findById( movieId )
  .then( movie => {
    Actor.find({ "_movie": movie._id })
    .populate("_celebrity")
    .then( actors => {
      let movieData = {
        title: movie.title,
        plot: movie.plot,
        genre: movie.genre.join(", ")       // genre is an array of strings, so we need to join(", ") as a string before passing it to the view
      }
      res.render( 'movies/show', { movie: movieData, actors } );
    })
  })
  .catch( err => { throw err });
});


// GET /movies/:id/edit
router.get('/:id/edit', (req, res) => {
  let movieId = req.params.id;
  Movie.findById( movieId )
  .then( movie => {
    let movieData = {
      _id: movie._id,
      title: movie.title,
      plot: movie.plot,
      genre: movie.genre.join(", ")
    }
    res.render( 'movies/edit', movieData);
  })
  .catch( err => { throw err });
});


// POST /movies/:id/update
router.post('/:id/update', (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let plot =  req.body.plot;
  let genre = req.body.genre.match(/\b\w+\b/g);
  Movie.findByIdAndUpdate( id, {title, plot, genre} )
  .then( updatedMovie => {
    res.redirect( '/movies/' + updatedMovie._id.toString() );
  })
  .catch( err => { throw err });
});


// GET /movies/:id/delete
router.get('/:id/delete', (req, res) => {
  let movieId = req.params.id;
  Movie.findByIdAndRemove( movieId )
  .then( () => {
    console.log( "Movie successfully deleted." )
    res.redirect( '/movies' );
  })
  .catch( err => { throw err });
});

module.exports = router;
