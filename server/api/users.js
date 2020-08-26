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
    const singleUser = await getSingleUser(id);
    res.send(singleUser.Item);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // const id = +req.body.id
    // console.log('req body is',req.body)
    const { userName, firstName, lastName, email, password } = req.body;
    const id = Math.floor(Math.random() * 100)
    // console.log('thisi is id',id)
    const newUser = await addUser(id, userName, firstName, lastName, email, password);
    // console.log('NEW USER backend',newUser)
    res.send(newUser.Item);
  } catch (error) {
    console.error(error);
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
    console.error(next);
  }
});
//update User's ingredients by adding a new Ingredient
router.put("/:userId/ingredients", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    // TODO:destructure req.body depending on how much iingredinets will come from front-end(input)
    const { newIngredient } = req.body;
    const updatedIngredients = await updateUserIngredients(id, [newIngredient]);
    res.send(updatedIngredients);
  } catch (error) {
    console.error(next);
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
