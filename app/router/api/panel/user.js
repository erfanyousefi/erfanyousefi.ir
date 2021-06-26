const { Router } = require("express");
const router = Router();
const titleValidator = require("app/validator/title");
const userController = require(`${process.env.API}/user`);
const upload = require("app/http/middleware/uploadImage.js")
router.get("/list", userController.list);
router.get("/profile", userController.find);
router.put("/profile", upload.single("avatar"), userController.updateProfile);
// router.delete("/:id", userController.remove);

module.exports = router;