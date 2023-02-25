const { Router } = require("express");
const controllers = require("../controllers/base");
const router = Router();

router.get("/", controllers.home);

module.exports = router;
