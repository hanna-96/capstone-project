const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const path = require("path");
const bodyParser = require("body-parser");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const fileUpload = require("express-fileupload");
const vision = require("@google-cloud/vision");
const cors = require("cors");
const routes = require("./server/api/users");
app.use(express.static(path.join(__dirname, "/public")));
app.use(fileUpload());
app.use(cors());
app.use(redirectToHTTPS([/localhost:8080/], [], 301));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const maxAge = 604800000;
const expressSession = require("express-session");
const passport = require("passport");
const { getSingleUserByUserName } = require("./server/dynamoDB");
app.use(require("cookie-parser")());
const DynamoStore = require("dynamodb-store");

const AWS = require("aws-sdk");
if (process.env.NODE_ENV === "dev") require("./secrets");
let awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);
const DynamoDB = new AWS.DynamoDB();

const session = {
  cookie: { maxAge },
  secret: "Capstone", //add later to secrets.js
  resave: false,
  saveUninitialized: true,
  store: new DynamoStore({
    table: {
      name: "Sessions",
      hashKey: "id",
      hashPrefix: "",
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    },
    dynamoConfig: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: "us-east-2",
    },
  }),
};
if (process.env.PORT) {
  session.cookie.secure = true;
}
app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());
// also tried this:((
passport.serializeUser(function (user, done) {
  done(null, user.Item.userName);
});
passport.deserializeUser(async (userName, done) => {
  try {
    const user = await getSingleUserByUserName(userName);
    done(null, user.Item);
  } catch (err) {
    done(err);
  }
});

app.use("/api/users", routes);
app.use("/auth", require("./server/auth"));

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

app.listen(PORT, () => {
  console.log("App listening at port ", PORT);
});
