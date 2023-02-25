const router = require("express").Router();
const UserController = require("../controllers/user");

router.get("/", UserController.getUser);
router.get("/sort", UserController.getSortUsers);
router.get("/all", UserController.getUsers);
router.post("/", UserController.createUser);
router.patch("/", UserController.updateUser);
router.delete("/", UserController.delUser);

module.exports = router;
