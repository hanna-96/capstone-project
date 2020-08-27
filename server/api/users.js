const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getSingleUser,
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
router.get("/:userId", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    // const email = req.params.email
    const singleUser = await getSingleUser(id);
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
    console.log(newUser)
    res.send(newUser.Item);
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await getSingleUser(req.body.email);
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err)
  }
});
router.put("/:userId", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    const { name } = req.body;
    const updatedUser = await updateUserName(id, name);
    res.send(updatedUser.Item);
  } catch (error) {
    console.log(next);
  }
});
router.get("/:userId/allingredients", async (req, res, next) => {
  try {
    const id = +req.params.userId;

    const singleUser = await getSingleUser(id);
    const usersIngredients = singleUser.Item.ingredients;
    res.send(usersIngredients);
  } catch (error) {
    console.error(error);
  }
});
//update User's ingredients by adding a new Ingredient
router.put("/:userId/ingredients", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    // console.log("users id", id);
    // console.log("req.body isss", req.body);

    // TODO:destructure req.body depending on how much iingredinets will come from front-end(input)
    const { name } = req.body;
    const updatedIngredients = await updateUserIngredients(id, [name]);
    // console.log("the updated ingredients", updatedIngredients);
    //TODO:debug why updatedIngredients is an {}
    res.send(updatedIngredients);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    const deletedUser = await deleteUser(id);
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
