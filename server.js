const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080
const path = require('path')
const bodyParser = require('body-parser')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const vision = require('@google-cloud/vision')
// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));


// app.use(redirectToHTTPS([/localhost:8080/], [], 301));

const routes = require('./server/api/users')

app.use(redirectToHTTPS([/localhost:8080/], [], 301));
const session = require('express-session')
const passport = require('passport')
const { getSingleUserByEmail } = require('./server/dynamoDB')

// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

app.use(require('cookie-parser')());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api/users', routes)
app.use(redirectToHTTPS([/localhost:8080/], [], 301));
const session = require('express-session')

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Capstone!',
    resave: false,
    saveUninitialized: false
  })
)


app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use('/api/users', routes)



// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});



const server = app.listen(PORT, () => {
  console.log("App listening at port ", PORT);
});


// app.get('/login', (req, res, next) => {
//   res.send('hello')
// })