const { Router } = require("express");
const router = Router();
const titleValidator = require("app/validator/title");
const userController = require(`${process.env.API}/user`);

router.post("/register", titleValidator.insert(), userController.insert);
router.get("/login", userController.list);
router.get("/:id", userController.find);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;