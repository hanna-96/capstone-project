const express = require("express");
const app = express();
const port = 8080;
const path = require('path')
const bodyParser = require('body-parser')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const routes = require('./server/api/users')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api/users', routes)
app.use(redirectToHTTPS([/localhost:8080/], [], 301));



// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

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


const server = app.listen(8080, () => {
  console.log("App listening at port ", port);
});


// app.get('/login', (req, res, next) => {
//   res.send('hello')
// })