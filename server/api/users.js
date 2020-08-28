const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getSingleUserByUserName,
  updateUserName,
  deleteUser,
  updateUserIngredients,
} = require("../dynamoDB");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers.Items);
  } catch (error) {
    next(error);
  }
});
router.get("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const singleUser = await getSingleUserByUserName(userName);
    res.send(singleUser.Item);
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;
    const newUser = await addUser(
      userName,
      firstName,
      lastName,
      email,
      password
    );
    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await getSingleUserByUserName(req.body.userName);
    if (!user) {
      // console.log("No such user found:", req.body.userName);
      res.status(401).send("Wrong username and/or password");
    } else if (req.body.password !== user.Item.password) {
      // console.log("Incorrect password for user:", req.body.userName);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get('/me', (req, res) => {
  console.log('PATH GET /ME')
  res.json(req.user)
})
router.put("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { name } = req.body;
    const updatedUser = await updateUserName(id, name);
    res.send(updatedUser.Item);
  } catch (error) {
    console.log(next);
  }
});
router.get("/:userName/allingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const singleUser = await getSingleUserByUserName(userName);
    const usersIngredients = singleUser.Item.ingredients;
    res.send(usersIngredients);
  } catch (error) {
    console.error(error);
  }
});
//update User's ingredients by adding a new Ingredient
router.put("/:userName/ingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    // console.log("req.body isss", req.body);
    // TODO:destructure req.body depending on how much iingredinets will come from front-end(input)
    const { name } = req.body;
    const updatedIngredients = await updateUserIngredients(userName, [name]);
    // console.log("the updated ingredients", updatedIngredients);
    //TODO:debug why updatedIngredients is an {}
    res.send(updatedIngredients);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const deletedUser = await deleteUser(userName);
    res.sendStatus(204);
  } catch (error) {
    console.error(next);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
