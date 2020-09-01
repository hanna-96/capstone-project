const express = require("express");
const app = express();

const session = require('express-session');
// const DynamoDBStore = require('connect-dynamodb')({session: session});
const PORT = process.env.PORT || 8080
const path = require('path')
const bodyParser = require('body-parser')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const fileUpload = require('express-fileupload')
const vision = require('@google-cloud/vision')
const cors = require('cors')
// const DynamoStore = require('connect-dynamodb-session')(session);
const passport = require('passport')
// const LocalStrategy   = require('passport-local').Strategy;
const bcrypt   = require('bcrypt-nodejs');
const routes = require('./server/api/users')
const { getSingleUserByUserName } = require('./server/dynamoDB')

if (process.env.NODE_ENV === "dev") require("./secrets");

// This serves static files from the specified directory
app.use(express.static(path.join(__dirname, "/public")))
// /, { maxAge }
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
const AWS = require("aws-sdk")
// if (process.env.NODE_ENV === "dev") 
require("./secrets")
let awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}
AWS.config.update(awsConfig)
const DynamoDB = new AWS.DynamoDB()

//when the function is called only the userName is stored in sessions table

// const session = {
//   cookie: { maxAge },
//   secret: "Capstone", //add later to secrets.js
//   resave: false,
//   saveUninitialized: true,
//   store: new DynamoStore({
//     table: {
//       name: "Sessions", 
//       hashKey: "id",
//       hashPrefix: "",
//       readCapacityUnits: 5,
//       writeCapacityUnits: 5,
//     },
//     dynamoConfig: {
//       accessKeyId: process.env.ACCESS_KEY_ID,
//       secretAccessKey: process.env.SECRET_ACCESS_KEY,
//       region: "us-east-2",
//     },
//   }),
// };
// if (process.env.PORT) {
//   session.cookie.secure = true;
// }
// app.use(expressSession(session));

// ORIGINAL
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Capstone!',
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize());
app.use(passport.session());

// passport registration original

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

//also tried this:((
passport.serializeUser(function (user, done) {
  done(null, user.Item.userName);
})
passport.deserializeUser(async (userName, done) => {
  try {
    console.log('wtf: ', getSingleUserByUserName)
    const user = await getSingleUserByUserName(userName)
    done(null, user.Item)
  } catch (err) {
    done(err)
  }
})
// passport.deserializeUser(function (userName, done) {
//   // const AWS = require("aws-sdk");
//   // if (process.env.NODE_ENV === "dev") require("./secrets");
//   // let awsConfig = {
//   //   region: "us-east-2",
//   //   endpoint: process.env.AWS_ENDPOINT,
//   //   accessKeyId: process.env.ACCESS_KEY_ID,
//   //   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   // };

//   // AWS.config.update(awsConfig)
//   //connecting to AWS DynamoDB
//   // const DynamoDB = new AWS.DynamoDB()
//   //return user by login
//   console.log("user", userName)
//   DynamoDB.getItem("user", userName, null, {}, function (err, item, cap) {
//     console.log("Hey!!!!", item)
//     if (err) done(err, item);
//     done(null, { "userName": item.userName.S });
//   });
// });

// passport.use('local-login',
//   new LocalStrategy({
//     usernameField: 'userName',
//     passwordField: 'password',
//     passReqToCallback : true
//   },
//   function (userName, password, done) {
//     console.log('from local-login query: ', userName)
//     const params = {
//       "TableName": "Users3",
//       "Key": {
//         "userName": userName
//       }
//     }
//     DynamoDB.getItem(params, function (err, item, cap) {
//       if (err) {
//         //return the response from callback when an error happens
//         return done(err);
//       } else {
//         if (item) {
//           //return the response from callback when the login is ok
//           console.log('item from login strat: ', item)
//           return done(null, item);
//         } else {
//           //return the response from callback when the login is invalid
//           return done(null, false, {
//             message: "Login Invalid",
//           });
//         }
//       }
//     });
//   })
// );



app.use("/api/users", routes);
app.use("/auth", require('./server/auth'));

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

app.listen(PORT, () => {
  console.log("App listening at port ", PORT);
});
