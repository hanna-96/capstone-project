const router = require("express").Router();
const {
    addUser,
    getAllUsers,
    getSingleUser,
    updateUserName,
    deleteUser,
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
    const { id, userName, firstName, lastName } = req.body;
    const newUser = await addUser(id, userName, firstName, lastName);
    res.send(newUser.Item);
  } catch (error) {
    console.error(next);
  }
});
router.put("/:userId", async (req, res, next) => {
  try {
    const id = +req.params.userId;
    const { name } = req.body;
    const updatedUser = await updateUserName(id, name);
    res.send(updatedUser.Item);
  } catch (error) {
    console.error(next);
  }
});
//add update User by adding a new Ingredient

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
