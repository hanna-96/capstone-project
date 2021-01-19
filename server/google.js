const passport = require("passport");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { addUser, getSingleUserByUserName } = require("./dynamoDB");
// if (process.env.NODE_ENV === "dev") require("../secrets");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK,
} = require("../secrets");

module.exports = router;
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log("Google client ID / secret not found. Skipping Google OAuth.");
} else {
  const googleConfig = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
  };
  const strategy = new GoogleStrategy(
    googleConfig,
    async (token, refreshToken, profile, done) => {
      const googleId = profile.id;
      const userName = profile.name.givenName;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName || "foo";
      const lastName = profile.name.familyName;
      const password = "123";
      const newUser = await addUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        googleId
      );
      const user = await getSingleUserByUserName(userName);
      await getSingleUserByUserName(user.Item.userName)
        .then((user) => done(null, user))
        .catch(done);
    }
  );
  //google verifies the user
  passport.use(strategy);

  //authenticates the  request.
  router.get(
    "/",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  router.get(
    "/callback",
    passport.authenticate("google", {
      successRedirect: "/welcome",
      failureRedirect: "/login",
    })
  );
}
