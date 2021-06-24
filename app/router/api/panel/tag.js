const { Router } = require("express");
const router = Router();
const titleValidator = require("app/validator/title");
const tagController = require(`${process.env.API}/tag`);

router.post("/", titleValidator.insert(), tagController.insert);
router.get("/list", tagController.list);
router.get("/:id", tagController.find);
router.put("/:id", tagController.update);
router.delete("/:id", tagController.remove);

module.exports = router;