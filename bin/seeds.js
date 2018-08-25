const mongoose = require('mongoose');
const faker = require('faker');
const phrases = require('../data/phrases');
const Celebrity = require('../models/Celebrity');

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/celebrities', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// simple function to get a random occupation
function randomOccupation() {
  var occupations = [ "movie star", "singer", "comedian", "unknown" ];
  let randomNum = Math.floor(Math.random() * occupations.length);
  return occupations[randomNum];
}

// here we create an array of 50 celebrities objects
// to pass inside the Celebrity.create() promise
let celebrities = [];

for (let i = 0; i < 50; i++) {
  let name = faker.name.firstName() + " " + faker.name.lastName();
  let occupation = randomOccupation();
  let catchPhrase = phrases[i].replace("Chuck Norris", name);
  celebrities.push({ name, occupation, catchPhrase })
}

// seeding the database
Celebrity.deleteMany()            // deleting the celebrities collection if it exists
.then( () => {
  Celebrity.create( celebrities ) // creating the new celebrities collection
  .then( newCelebrities => {
    console.log( newCelebrities );
    console.log( newCelebrities.length + " new celebrities created!" );
    mongoose.connection.close();
  })
  .catch( err => { throw err });
} )
.catch( err => { throw err });


