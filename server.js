const express = require("express");
const app = express();

const expressSession = require("express-session");
// const DynamoStore = require('connect-dynamodb')({session: session});
const DynamoStore = require("dynamodb-store");
const PORT = process.env.PORT || 8080;
const path = require("path");
const bodyParser = require("body-parser");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const fileUpload = require("express-fileupload");
const vision = require("@google-cloud/vision");
const cors = require("cors");
const passport = require("passport");
// const LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require("bcrypt-nodejs");
const routes = require("./server/api/users");
const expressValidator = require("express-validator");
//users will be kept logged in 1 week in dynamoDb
const maxAge = 604800000;
app.use(expressValidator());
// This serves static files from the specified directory
app.use(express.static(path.join(__dirname, "/public"), { maxAge }));

// app.use(redirectToHTTPS([/localhost:8080/], [], 301));

//parser for multipart/form-data
app.use(fileUpload());
app.use(cors());
app.use(redirectToHTTPS([/localhost:8080/], [], 301));
// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

app.use(require("cookie-parser")());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const secrets = require("./secrets");

// passport registration
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const session = {
  cookie: { maxAge },
  secret: "Capstone", //change later for safety
  resave: false,
  saveUninitialized: true,
  store: new DynamoStore({
    table: {
      name: "Sessions", //might be wrong
      hashKey: "id",
      hashPrefix: "",
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    },
    dynamoConfig: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey:process.env.SECRET_ACCESS_KEY,
      region: "us-east-2",
    },
  }),
};
if (process.env.PORT) {
  session.cookie.secure = true;
}

app.use(expressSession(session));

//ORIGINAL
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'Capstone!',
//     resave: false,
//     saveUninitialized: false
//   })
// )

app.use(passport.initialize());
app.use(passport.session());



app.use("/api/users", routes);

app.post("/gvision", async (req, res, next) => {
  try {
    //still need these console.logs for mobile tests
    console.log("hi from the gvision route!");
    console.log(req.files.img);
    const client = new vision.ImageAnnotatorClient();
    const fileName = req.files.img.data;
    //result is the full json object
    const [result] = await client.documentTextDetection(fileName);
    //result.fullTextAnnotation.text gives us one string with all transcribed text
    const fullTextAnnotation = result.fullTextAnnotation;
    res.send(fullTextAnnotation.text.split("\n"));
  } catch (e) {
    next(e);
  }
});

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

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'Capstone!',
//     resave: false,
//     saveUninitialized: false
//   })
// )

const server = app.listen(PORT, () => {
  console.log("App listening at port ", PORT);
});
