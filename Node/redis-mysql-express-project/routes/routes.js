const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const authMiddle = require("../middlewarers/auth");

router.get("/users", controller.getUsers);

router.get("/", authMiddle.auth, controller.getUser);

router.post("/name", controller.getName);

router.post("/create", controller.createUser);

router.delete("/:id", controller.deleteUser);

router.put("/", authMiddle.auth, controller.updateUser);

router.patch("/:id", controller.partialUpdate);

module.exports = router;
