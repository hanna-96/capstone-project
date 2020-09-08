const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getSingleUserByUserName,
  updateUserName,
  deleteUser,
  updateUserIngredients,
  deleteUserIngredients,
  updateUserFavorites,
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
    await addUser(userName, firstName, lastName, email, password);
    const newUser = {
      Item: {
        userName,
        firstName,
        lastName,
        email,
        password,
        ingredients: [],
        favorites: [],
      },
    };
    req.login(newUser, (err) => (err ? next(err) : res.json(newUser)));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await getSingleUserByUserName(req.body.userName);
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    } else if (req.body.password !== user.Item.password) {
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

router.put("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { name } = req.body;
    const updatedUser = await updateUserName(userName, name);
    res.send(updatedUser.Item);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:userName/allingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const singleUser = await getSingleUserByUserName(userName);
    if (singleUser.Item.ingredients) {
      const usersIngredients = singleUser.Item.ingredients;
      res.send(usersIngredients);
    } else {
      console.log("error users does not have ingredients");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:userName/allingredients/:idx", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const idx = req.params.idx;
    const singleUser = await getSingleUserByUserName(userName);
    const usersIngredients = singleUser.Item.ingredients[idx];
    res.send(usersIngredients);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// update User's ingredients by adding a new Ingredient
router.put("/:userName/allingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { ingredient } = req.body;
    const updatedIngredients = await updateUserIngredients(userName, [
      ingredient,
    ]);
    res.send(updatedIngredients);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    await deleteUser(userName);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userName/allingredients/", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { ingredients, idx } = req.body;
    const singleUser = await getSingleUserByUserName(userName);
    const userIngred = singleUser.Item.ingredients;
    const deletedIngredients = await deleteUserIngredients(userName, [
      userIngred[idx],
    ]);
    res.send(deletedIngredients);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userName/allingredients/:idx", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const idx = req.params.idx;
    const singleUser = await getSingleUserByUserName(userName);
    const ingredients = singleUser.Item.ingredients;
    const deletedIngredients = await deleteUserIngredients(userName, [idx]);
    res.send(deletedIngredients);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/:userName/favorites", async (req, res, next) => {
  try {
    await updateUserFavorites(req.params.userName, req.body.favorites);
    res.send("favorites updated");
  } catch (e) {
    next(e);
  }
});

router.use((req, res, next) => {
  err.status = 404;
  next(err);
});

module.exports = router;
