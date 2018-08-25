var express = require('express');
var router = express.Router();
var Celebrity = require('../models/Celebrity');

/* GET /celebrities */
router.get('/', function(req, res, next) {
  Celebrity.find()
  .then( celebrities => {
    res.render('celebrities/index', { celebrities });
  })
  .catch( err => { throw err });
});

// GET /celebrities/new
router.get('/new', (req, res) => {
  let occupations = [ "comedian", "movie star", "singer", "unknown" ];
  res.render('celebrities/new', { occupations });
});

// GET /celebrities/create
router.get('/create', (req, res) => {
  let newCelebrity = {
    name: req.query.name,
    occupation: req.query.occupation,
    catchPhrase: req.query.catchPhrase,
  };
  Celebrity.create(newCelebrity)
  .then(newCelebrity => {
    res.redirect('/celebrities/' + newCelebrity._id.toString());
  })
  .catch( err => { throw err });
});

// GET /celebrities/:id
router.get('/:id', (req, res) => {
  let celebrityId = req.params.id;
  Celebrity.findById( celebrityId )
  .then( celebrity => {
    res.render( 'celebrities/show', celebrity );
  })
  .catch( err => { throw err });
});

// GET /celebrities/:id/delete
router.get('/:id/delete', (req, res) => {
  let celebrityId = req.params.id;
  Celebrity.findByIdAndRemove( celebrityId )
  .then( () => {
    console.log( "Celebrity successfully deleted." )
    res.redirect( '/celebrities' );
  })
  .catch( err => { throw err });
});


module.exports = router;
