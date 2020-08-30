const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080
const path = require('path')
const bodyParser = require('body-parser')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const fileUpload = require('express-fileupload')
const vision = require('@google-cloud/vision')
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy;
const AWS = require("aws-sdk");
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
app.use(flash());
const {getSingleUserByUserName} = require('./server/dynamoDB')


if (process.env.NODE_ENV === "dev") require("./secrets");
let awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);
//connecting to AWS DynamoDB
const DynamoDB = new AWS.DynamoDB();
const DocumentClient = new AWS.DynamoDB.DocumentClient();
// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

// app.use(redirectToHTTPS([/localhost:8080/], [], 301));

//parser for multipart/form-data
app.use(fileUpload())
app.use(cors())

const routes = require('./server/api/users')

app.use(redirectToHTTPS([/localhost:8080/], [], 301));
const session = require('express-session')
const passport = require('passport')

// This serves static files from the specified directory
app.use(express.static(__dirname + "/public"));

app.use(require('cookie-parser')());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Capstone!',
    resave: false,
    saveUninitialized: false
  })
)


app.use(passport.initialize())
app.use(passport.session())

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log('inside serialize user', user)
    done(null, user.Item.userName);
    // done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(userName, done) {
    DocumentClient.get({"TableName":"Users3","Key": {"userName":userName}}, function(err,data){
      console.log('data before of des', data)
      if (err){
        done(err,data);
      }
      console.log('data after of des', data)
      done(err,{"userName": data.Item.userName, "password": data.Item.password});
    })
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'



  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    userName : 'userName',
    password : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, userName, password, done) {
    var params = {
      "TableName":"Users3",
      // "IndexName":"email-index",
      "KeyConditions":{
        "userName":{
          "ComparisonOperator":"EQ",
          "AttributeValueList":[{"S":userName}]
        }
      }
    }

    console.log("Scanning for :"+JSON.stringify(params))//.Items["email"].name)

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    DocumentClient.query(params, function(err,data){
      // if there are any errors, return the error
      if (err){
        return done(err);
      }

      // check to see if theres already a user with that email
      if (data.Items.length > 0) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

        var params = {
          "TableName":"Users3",
          "Item" : {
            "id":(Math.floor(Math.random() * 4294967296)).toString(),
            "userName":userName,
            "password":bcrypt.hashSync(password)
          }
        }
        DocumentClient.put(params, function(err,data){
          if (err){
            return done(null, false, req.flash('signupMessage', "Apologies, please try again now. ("+err+")"));
          }else{
            return done(null, params.Item);
          }
        })

      }

    });

  }));

    // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    userName : 'userName',
    password : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, userName, password, done) { // callback with email and password from our form
    var params = {
      "TableName":"Users3",
      // "IndexName":"email-index",
      "KeyConditions":{
        "userName":{
          "ComparisonOperator":"EQ",
          "AttributeValueList":["userName"]
        }
      }
    }
    DocumentClient.query(params, function(err,data){
      if (err){
        return done(err);
      }
      if (data.Items.length == 0){
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }
      DocumentClient.get({"TableName":"Users3","Key": {"userName":data.Items[0]["userName"]}}, function(err,data){
        if (err){
          return done(err);
        }
        if (!bcrypt.compareSync(password, data.Item.password.S)){
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        }else{
          return done(null, data.Item);
        }
      })
    });
  }));

//   app.post('/login',
//   passport.authenticate('local-login', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true }),
//                                    async (req, res, next) => {
//                                     try {
//                                       const user = await getSingleUserByUserName(req.body.userName);
//                                       if (!user) {
//                                         // console.log("No such user found:", req.body.userName);
//                                         res.status(401).send("Wrong username and/or password");
//                                       } else if (req.body.password !== user.Item.password) {
//                                         // console.log("Incorrect password for user:", req.body.userName);
//                                         res.status(401).send("Wrong username and/or password");
//                                       } else {
//                                         req.login(user, (err) => (err ? next(err) : res.json(user)));
//                                       }
//                                     } catch (err) {
//                                       next(err);
//                                     }}
                                  
// );
//   function(req,res,next){

// });


app.use('/api/users', routes)

app.post('/gvision', async (req, res, next) => {
  try {
    //still need these console.logs for mobile tests
    console.log('hi from the gvision route!')
    console.log(req.files.img)
    const client = new vision.ImageAnnotatorClient()
    const fileName = req.files.img.data
    //result is the full json object
    const [result] = await client.documentTextDetection(fileName)
    //result.fullTextAnnotation.text gives us one string with all transcribed text
    const fullTextAnnotation = result.fullTextAnnotation
    res.send(fullTextAnnotation.text.split('\n'))
  } catch(e) { next(e) }
})

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


// app.get('/login', (req, res, next) => {
//   res.send('hello')
// })