![Iron Hack logo](https://camo.githubusercontent.com/52d2ff8778b60261533a7dba8dd989c6893a519b/68747470733a2f2f692e696d6775722e636f6d2f315167724e4e772e706e67)

# DE | Mongoose Movies

The original lab can be found at [https://github.com/ironhack-labs/lab-mongoose-movies](https://github.com/ironhack-labs/lab-mongoose-movies)
---
## Starting the lab
I started the lab using the `express-generator` package.

Following the instructions on the [Express official documentation](http://expressjs.com/en/starter/generator.html), if we launch this command on the terminal `express-generator --view=hbs --css=sass` we are going to initialize a project based on ExpressJS that will use `hbs` as `view engine` and `sass` framework to build your `css` files.

You can leave `--css=sass` out if you don't want to use `sass` and you can write your own `css` files as usual.
But remember that the `sass` framework is really convenient because you can use **variables, nested styles, partials, operators (to do some calculations inside your styles) and more**, resulting in shorter and more readable css files.

Further readings:
- [Express official documentation](http://expressjs.com/en/starter/generator.html)
- [Sass Basics (from official Sass website)](http://sass-lang.com/guide)
---
## Seeding the database
To seed the database, I used the `faker` package.
It's an interesting module that let you create fake data for the documents that you want to create into the DB.
i.e. if you want to create `firstName` and `lastName` variables for a `User` model you can use this expression:
```javascript
let firstName = faker.name.firstName();
let lastName  = faker.name.firstName();
```
Very simple, isn't it?
And you can create addresses, email addresses, domains, comapnies names, dates etc...

Take a look at `bin/seeds.js` file to see how using `faker` to create fake data for the database.

Further readings:
- [npm faker page](https://www.npmjs.com/package/faker)
- [faker github repository](https://github.com/Marak/Faker.js)
---
