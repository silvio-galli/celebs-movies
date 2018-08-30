const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET /signup
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// POST /signup
router.post('/signup', (req, res) => {
  let { username, password, checkPassword } = req.body;

  if ( username === "" || password === "" || checkPassword === "" ) {
    res.render( 'users/signup', {
      message: "Please, enter all the required fields."
    });
  }
  
  if ( password !== checkPassword ) {
    res.render( 'users/signup', {
      message: "Please, enter the same password two times."
    });
  }

  const salt = 10;
  const saltRound = bcrypt.genSaltSync(salt);
  const hashPass = bcrypt.hashSync(password, saltRound);

  User.create({username, password: hashPass})
  .then(newUser => {
    console.log( "New user created!" );
    res.render('users/login', {
      message: "Great! Your account was successfully registered.\nYou can login.",
      messageType: "success"
    })
  })
  
});

// GET /login
router.get('/login', (req, res) => {
  res.render('users/login');
});

module.exports = router;