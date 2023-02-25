const router = require("express").Router();
const indexControllers = require("../controllers/index");
const usersRoute = require("./user")

router.get("/", indexControllers.home);

router.use("/user",usersRoute)

module.exports = router;
