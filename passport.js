// // config/passport.js

// // load all the things we need
// var LocalStrategy = require("passport-local").Strategy;

// var bcrypt = require("bcrypt-nodejs");
// const AWS = require("aws-sdk");
// if (process.env.NODE_ENV === "dev") require("./secrets");
// let awsConfig = {
//   region: "us-east-2",
//   endpoint: process.env.AWS_ENDPOINT,
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// };

// AWS.config.update(awsConfig);
// // connecting to AWS DynamoDB
// const DynamoDB = new AWS.DynamoDB();
// // var tableName = "Users3";
// const DocumentClient = new AWS.DynamoDB.DocumentClient();

// // expose this function to our app using module.exports
// module.exports = function (passport) {
//   // =========================================================================
//   // passport session setup ==================================================
//   // =========================================================================
//   // required for persistent login sessions
//   // passport needs ability to serialize and unserialize users out of session

//   // used to serialize the user for the session
//   passport.serializeUser(function (user, done) {
//     console.log("inside serialize user", user);
//     done(null, user.Item.userName);
//   });

//   // used to deserialize the user
//   passport.deserializeUser(function (userName, done) {
//     DocumentClient.get(
//       { "TableName": "Users3", "Key": { "userName": userName } },
//       function (err, data) {
//         console.log("data before of des", data);
//         if (err) {
//           done(err, data);
//         }
//         console.log("data after of des", data);
//         done(err, {
//           "userName": data.Item.userName,
//           "password": data.Item.password,
//         });
//       }
//     );
//   });
//   // =========================================================================
//   // LOCAL SIGNUP ============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'
//   passport.use(
//     "local-signup",
//     new LocalStrategy(
//       {
//         // by default, local strategy uses username and password, we will override with email
//         userName: "userName",
//         firstName: "firstName",
//         lastName: "lastName",
//         email: "email",
//         password: "password",
//         passReqToCallback: true, // allows us to pass back the entire request to the callback
//       },
//       function (req, userName, password, done) {
//         const params = {
//           "TableName": "Users3",
//           // "IndexName":"email-index",
//           "KeyConditions": {
//             "userName": {
//               "ComparisonOperator": "EQ",
//               "AttributeValueList": [userName ],//was{username}
//             },
//           },
//         };

//         console.log("Scanning for :" + JSON.stringify(params)); //.Items["email"].name)

//         // find a user whose email is the same as the forms email
//         // we are checking to see if the user trying to login already exists
//         DocumentClient.query(params, function (err, data) {
//           // if there are any errors, return the error
//           if (err) {
//             return done(err);
//           }
//           // check to see if theres already a user with that email
//           if (data.Items.length > 0) {
//             return done(
//               null,
//               false,
//               req.flash("signupMessage", "That email is already taken.")
//             );
//           } else {
//             const params = {
//               "TableName": "Users3",
//               "Item": {
//                 "id": Math.floor(Math.random() * 4294967296).toString(),
//                 "userName": userName,
//                 "password": bcrypt.hashSync(password),
//               },
//             };
//             DocumentClient.put(params, function (err, data) {
//               if (err) {
//                 return done(
//                   null,
//                   false,
//                   req.flash(
//                     "signupMessage",
//                     "Apologies, please try again now. (" + err + ")"
//                   )
//                 );
//               } else {
//                 return done(null, params.Item);
//               }
//             });
//           }
//         });
//       }
//     )
//   );

//   // =========================================================================
//   // LOCAL LOGIN =============================================================
//   // =========================================================================
//   // we are using named strategies since we have one for login and one for signup
//   // by default, if there was no name, it would just be called 'local'

//   passport.use(
//     "local-login",
//     new LocalStrategy(
//       {
//         // by default, local strategy uses username and password, we will override with email
//         userName: "userName",
//         password: "password",
//         passReqToCallback: true, // allows us to pass back the entire request to the callback
//       },
//       function (req, userName, password, done) {
//         // callback with email and password from our form
//         const params = {
//           "TableName": "Users3",
//           // "IndexName":"email-index",
//           "KeyConditions": {
//             "userName": {
//               "ComparisonOperator": "EQ",
//               "AttributeValueList": [userName],
//             },
//           },
//         };
//         DocumentClient.query(params, function (err, data) {
//           if (err) {
//             return done(err);
//           }
//           if (data.Items.length == 0) {
//             return done(
//               null,
//               false,
//               req.flash("loginMessage", "No user found.")
//             ); // req.flash is the way to set flashdata using connect-flash
//           }
//           DocumentClient.get(
//             {
//               "TableName": "Users3",
//               "Key": { "userName": data.Items[0]["userName"] },
//             },
//             function (err, data) {
//               if (err) {
//                 return done(err);
//               }
//               if (!bcrypt.compareSync(password, data.Item.password)) {
//                 return done(
//                   null,
//                   false,
//                   req.flash("loginMessage", "Oops! Wrong password.")
//                 ); // create the loginMessage and save it to session as flashdata
//               } else {
//                 return done(null, data.Item);
//               }
//             }
//           );
//         });
//       }
//     )
//   );
// };
