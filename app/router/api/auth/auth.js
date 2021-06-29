const { Router } = require("express");
const router = Router();

const authValidator = require("app/validator/auth");
const authcontroller = require(`${process.env.API}/auth/auth`);

router.post("/register", authValidator.register(), authcontroller.register)
router.post("/login", authValidator.login(), authcontroller.login)
module.exports = router;