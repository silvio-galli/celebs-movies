const mongoose = require('mongoose');
const chalk = require('chalk');
const success = chalk.bold.green;
const faker = require('faker');
const phrases = require('../data/phrases');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');


// simple function to get a random value from an array
// the result will be an array, so,
// if the value of the field you are going to use this function
// is not an Array, you need to do something with the values inside the resulting array
 
function randomValues(arr, times = 1) { // times parameter if not present default to 1
  var result = [];
  for (let i = 0; i < times; i++) {
    let randomNum = Math.floor(Math.random() * arr.length);
    if ( !result.includes( arr[randomNum] )) result.push( arr[randomNum] );
  }
  return result;
}

// here we create an array of 50 celebrities objects
// to pass inside the Celebrity.create() promise
let celebrities = [];

for (let i = 0; i < 50; i++) {
  let name = faker.name.firstName() + " " + faker.name.lastName(); // calling faker two times to generate the name
  // now we call the randomValues function
  // pass only [ "movie star", "singer", "comedian", "unknown" ] array as parameter
  // to generate an array containing only one element
  // As the occupation field in Celebrity document is a String type
  // we need to access the value of the only element inside the array and set its value to the variable
  let occupation = randomValues( [ "movie star", "singer", "comedian", "unknown" ] )[0];
  let catchPhrase = phrases[i].replace("Chuck Norris", name);
  celebrities.push({ name, occupation, catchPhrase })
}
console.log( "CELEBRITIES -->", celebrities )
// here we create an array of 50 movies objects
// to pass inside the Movie.create() promise
let movies = [];
const genres = ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy", "doc"];
for (let i = 0; i < 50; i++) {
  let randNum = Math.ceil(Math.random() * 3);   // generates a random number between 1 and 3
  let title = faker.lorem.sentence();     // calling the faker package to create a random sentence
  // now we call the randomValues function
  // pass genres array and randNum as parameters
  // to generate an array of 1 to 3 strings
  let genre = randomValues( genres, randNum ); 
  let plot = faker.lorem.paragraph();     // calling the faker package to create a random paragraph
  movies.push({ title, genre, plot })
}

console.log( "MOVIES -->", movies );

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/celebrities', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// seeding the database
Celebrity.deleteMany()                       // deleting the celebrities collection if it exists
.then( () => {
  return Movie.deleteMany()                  // deleting the movies collection if it exists
  .then(() => {
    return Celebrity.create( celebrities );  // creating the new celebrities collection
  })
  .then( newCelebrities => {
    // here we can see in the console the result of Celebrity.create( celebrities );
    console.log( chalk.black.bgYellow("< -- START -- >") )
    console.log( success("New celebrities list:") )
    console.log( "\n" );    
    console.log( newCelebrities );
    console.log( "\n" );
    console.log( success(newCelebrities.length + " new celebrities created!") );
    console.log( chalk.black.bgYellow("< -- END -- >") )
    console.log( "\n" );

    return Movie.create( movies );          // creating the new movies collection
  })
  .then( newMovies => {
    // here we can see in the console the result of Movie.create( movies );
    console.log( chalk.black.bgYellow("< -- START -- >") )
    console.log( success("New movies list:") );
    console.log( "\n" );
    console.log( newMovies );
    console.log( "\n" );
    console.log( success( newMovies.length + " new Movies created!" ) );
    console.log( chalk.black.bgYellow("< -- END -- >") )
    console.log( "\n" );

    mongoose.connection.close();            // closing connection to DB
  })
  .catch( err => { throw err });
} )
.catch( err => { throw err });


