const express = require("express");
const app = express();
const port = 8080;
const path = require('path')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;


app.use(redirectToHTTPS([/localhost:8080/], [], 301));

app.use('/api/users',require('./server/api/users'))

// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

// sends index.html
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

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