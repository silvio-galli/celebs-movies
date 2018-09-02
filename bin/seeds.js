const mongoose = require('mongoose');
const chalk = require('chalk');
const success = chalk.bold.green;
const faker = require('faker');
const phrases = require('../data/phrases');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');
const Actor = require('../models/Actor');

mongoose
  .connect('mongodb://localhost/celebs-movies', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

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

// here we create an array celebrity objects
// to pass inside the Celebrity.create() promise
let celebrities = [];

// creating 20 movie stars
for (let i = 0; i < 20; i++) {
  let firstName = faker.name.firstName() // calling faker to generate the firstName
  let lastName = faker.name.lastName() // calling faker to generate the lastName
  let occupation = "movie star";
  let catchPhrase = phrases[i].replace(new RegExp("Chuck", "gi"), `${firstName}`);
  catchPhrase = catchPhrase.replace(new RegExp("Norris", "gi"), `${lastName}`);
  let newCelebrity = new Celebrity({ firstName, lastName, occupation, catchPhrase });  // creating an instance of the model like this and pushing this instance into a global variable, permit to have access to the id of the instance evrywhere in the seeds file
  celebrities.push(newCelebrity);
}

// creating 50 random celebrities
for (let i = 0; i < 50; i++) {
  let firstName = faker.name.firstName() // calling faker to generate the firstName
  let lastName = faker.name.lastName() // calling faker to generate the lastName
  // now we call the randomValues function
  // pass only [ "movie star", "singer", "comedian", "unknown" ] array as parameter
  // to generate an array containing only one element
  // As the occupation field in Celebrity document is a String type
  // we need to access the value of the only element inside the array and set its value to the variable
  let occupation = randomValues( [ "movie star", "singer", "comedian", "unknown" ] )[0];
  let catchPhrase = phrases[i].replace(new RegExp("Chuck", "gi"), `${firstName}`);
  catchPhrase = catchPhrase.replace(new RegExp("Norris", "gi"), `${lastName}`);
  let newCelebrity = new Celebrity({ firstName, lastName, occupation, catchPhrase });  // creating an instance of the model like this and pushing this instance into a global variable, permit to have access to the id of the instance evrywhere in the seeds file
  celebrities.push(newCelebrity);
}
console.log( "CELEBRITIES -->", celebrities )

// To use when creating links between celebrity and movie
let movieStars = celebrities.filter( celebrity => celebrity.occupation === "movie star" );


// here we create an array of 50 movies objects
// to pass inside the Movie.create() promise
let movies = [];
const genres = ["action", "romantic", "drama", "adventure", "comedy", "science-fiction", "fantasy"];
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

// creating 8 "doc" movies
for (let i = 0; i < 8; i++) {
  let title = faker.lorem.sentence();     // calling the faker package to create a random sentence
  // now we call the randomValues function
  // pass genres array and randNum as parameters
  // to generate an array of 1 to 3 strings
  let genre = ["doc"];
  let plot = faker.lorem.paragraph();     // calling the faker package to create a random paragraph
  movies.push({ title, genre, plot })
}

console.log( "MOVIES -->", movies );


// seeding the database
Celebrity.deleteMany()                       // deleting the celebrities collection if it exists
.then( () => {
  return Movie.deleteMany()
  .then( () => {
    return Actor.deleteMany();
  })                  // deleting the movies collection if it exists
  .then(() => {
    return Promise.all(
      celebrities.map( celebrity => {
        return celebrity.save();  // creating the new celebrities collection
      })
    )
  })
  .then( newCelebrities => {
    // here we can see in the console the result of Celebrity.create( celebrities );
    console.log( chalk.black.bgYellow("< -- New Celebrities START -- >") )
    console.log( success("New celebrities list:") )
    console.log( "\n" );    
    console.log( newCelebrities );
    console.log( "\n" );
    console.log( success(newCelebrities.length + " new celebrities created!") );
    console.log( chalk.black.bgYellow("< -- New Celebrities END -- >") )
    console.log( "\n" );

    return Movie.create( movies );          // creating the new movies collection
  })
  .then( newMovies => {
    // here we can see in the console the result of Movie.create( movies );
    console.log( chalk.black.bgYellow("< -- New Movies START -- >") )
    console.log( success("New movies list:") );
    console.log( "\n" );
    console.log( newMovies );
    console.log( "\n" );
    console.log( success( newMovies.length + " new Movies created!" ) );
    console.log( chalk.black.bgYellow("< -- New Movies END -- >") )
    console.log( "\n" );

    let noDocs = newMovies.filter( movie => !movie.genre.includes("doc"));

    let actors = [];
    noDocs.map( movie => {
      let players = movieStars.slice(0);
      for ( let i = 0; i < 3; i++) {
        let player = randomValues(players)[0];
        var actor = new Actor({
          _movie: movie,
          _celebrity: player
        });
        actors.push( actor.save() );
        players.splice(players.indexOf(player), 1) // splice the players array to avoid duplication
        console.log( chalk.black.bgYellow( "Players.length", players.length) );
      }
    })
    
    return Promise.all( actors )
  })
  .then( newActors => {
    console.log( "Actors -->", newActors )
    mongoose.connection.close();            // closing connection to DB
  } )
  .catch( err => { throw err });
} )
.catch( err => { throw err });


