const mongoose = require('mongoose');
const faker = require('faker');
const phrases = require('../data/phrases');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/celebrities', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// simple function to get a random occupation
function randomValues(arr, times=1) {
  var result = [];
  for (let i = 0; i < times; i++) {
    let randomNum = Math.floor(Math.random() * arr.length);
    if ( !result.includes( arr[randomNum] )) result.push( arr[randomNum] );
  }
  return result.join(", ");
}

// here we create an array of 50 celebrities objects
// to pass inside the Celebrity.create() promise
let celebrities = [];

for (let i = 0; i < 50; i++) {
  let name = faker.name.firstName() + " " + faker.name.lastName();
  let occupation = randomValues( [ "movie star", "singer", "comedian", "unknown" ] );
  let catchPhrase = phrases[i].replace("Chuck Norris", name);
  celebrities.push({ name, occupation, catchPhrase })
}

// here we create an array of 50 movies objects
// to pass inside the Movie.create() promise
let movies = [];

for (let i = 0; i < 50; i++) {
  let title = faker.lorem.sentence();
  let genre = randomValues( ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"], Math.ceil(Math.random() * 3) );
  let plot = faker.lorem.paragraph();
  movies.push({ title, genre, plot })
}



// seeding the database
Celebrity.deleteMany()            // deleting the celebrities collection if it exists
.then( () => {
  return Movie.deleteMany()
  .then(() => {
    return Celebrity.create( celebrities ); // creating the new celebrities collection
  })
  .then( newCelebrities => {
    console.log( newCelebrities );
    console.log( newCelebrities.length + " new celebrities created!" );
    
    return Movie.create( movies );
  })
  .then( newMovies => {
    console.log( newMovies );
    console.log( newMovies.length + " new Movies created!" );
    mongoose.connection.close();
  })
  .catch( err => { throw err });
} )
.catch( err => { throw err });


