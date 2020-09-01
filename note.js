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
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'Capstone!',
//     resave: false,
//     saveUninitialized: false
//   })
// )