var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie');

/* GET /movies */
router.get('/', function(req, res, next) {
  Movie.find()
  .then( movies => {
    res.render('movies/index', { movies });
  })
  .catch( err => { throw err });
});

// GET /movies/new
router.get('/new', (req, res) => {
  res.render('movies/new');
});

// GET /movies/create
router.get('/create', (req, res) => {
  let title = req.query.title;
  let plot =  req.query.plot;
  let genre = req.query.genre.match(/\b\w+\b/g).join(', ');
  
  Movie.create({title, plot, genre})
  .then(newMovie => {
    res.redirect('/movies/' + newMovie._id.toString());
  })
  .catch( err => { throw err });
});

// GET /movies/:id
router.get('/:id', (req, res) => {
  let movieId = req.params.id;
  Movie.findById( movieId )
  .then( movie => {
    res.render( 'movies/show', movie );
  })
  .catch( err => { throw err });
});

// GET /movies/:id/edit
router.get('/:id/edit', (req, res) => {
  let movieId = req.params.id;
  Movie.findById( movieId )
  .then( movie => {
    res.render( 'movies/edit', movie);
  })
  .catch( err => { throw err });
});

// POST /movies/:id/update
router.post('/:id/update', (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let plot =  req.body.plot;
  let genre = req.body.genre.match(/\b\w+\b/g).join(', ');
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
