const router = require("express").Router();
const {
  addUser,
  getAllUsers,
  getSingleUserByUserName,
  updateUserName,
  deleteUser,
  updateUserIngredients,
  deleteUserIngredients
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
    console.log(newUser)
    req.login(newUser, err => (err ? next(err) : res.json(newUser)))
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


router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log('PATH GET /ME')
  res.json(req.user)
})

router.put("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const { name } = req.body;
    const updatedUser = await updateUserName(userName, name);
    res.send(updatedUser.Item);
  } catch (error) {
    console.log(next);
  }
});
router.get("/:userName/allingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const singleUser = await getSingleUserByUserName(userName);
    console.log(singleUser)
    const usersIngredients = singleUser.Item.ingredients;
    console.log(singleUser)
    res.send(usersIngredients);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userName/allingredients/:idx", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    const idx = req.params.idx
    const singleUser = await getSingleUserByUserName(userName);
    console.log(singleUser)
    const usersIngredients = singleUser.Item.ingredients[idx];
    console.log(usersIngredients)
    res.send(usersIngredients);
  } catch (error) {
    console.error(error);
  }
});
// update User's ingredients by adding a new Ingredient



router.put("/:userName/allingredients", async (req, res, next) => {
  try {
    const userName = req.params.userName
    console.log(req.body, 'body')
    console.log(req.params, 'params')

    console.log("params", req.body.ingredient);
    // console.log("req.body isss", req.body);
    // TODO:destructure req.body depending on how much iingredinets will come from front-end(input)
    const { ingredient } = req.body;
    const updatedIngredients = await updateUserIngredients(userName, [
      ingredient,
    ]);
    res.send(updatedIngredients);
  } catch (error) {
    console.error(error);
  }
});


router.delete("/:userName", async (req, res, next) => {
  try {
    const userName = req.params.userName;
    await deleteUser(userName);
    res.sendStatus(204);
  } catch (error) {
    console.error(next);
  }
});

router.delete("/:userName/allingredients/", async (req, res, next) => {
  try {
    const userName = req.params.userName
    const { ingredients, idx } = req.body;
    
    const singleUser = await getSingleUserByUserName(userName)
    const userIngred = singleUser.Item.ingredients
    console.log(userIngred, 'in delete')
    console.log(req.params, req.body, 'params')
    const deletedIngredients = await deleteUserIngredients(userName, [
      userIngred[idx]
    ]);
    res.send(deletedIngredients);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:userName/allingredients/:idx", async (req, res, next) => {
  try {
    const userName = req.params.userName
    const idx = req.params.idx
    const singleUser = await getSingleUserByUserName(userName)
    const ingredients = singleUser.Item.ingredients
    console.log(idx, 'the index')
    console.log(req.params, 'the params')
    console.log(req.body, 'the body in router delete')
    const deletedIngredients = await deleteUserIngredients(userName, 
      [idx]
    );
    console.log(deletedIngredients, 'deleted')
    console.log('testing')
    res.send(deletedIngredients);
  } catch (error) {
    console.error(error);
  }
});



router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
