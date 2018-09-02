var express = require('express');
var router = express.Router();
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

/* GET home page. */
router.get('/', function(req, res, next) {
  Celebrity.find().sort({"created_at": -1}).limit(5).then( celebrities => {
    Movie.find().sort({"created_at": -1}).limit(5).then( movies => {
      res.render('index', { celebrities, movies });
    })
  })
});

module.exports = router;
