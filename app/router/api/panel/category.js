const { Router } = require("express");
const router = Router();
const titleValidator = require("app/validator/title");
const caregoryController = require(`${process.env.API}/category`);

router.post("/", titleValidator.insert(), caregoryController.insert);
router.get("/list", caregoryController.list);
router.get("/:id", caregoryController.find);
router.put("/:id", caregoryController.update);
router.delete("/:id", caregoryController.remove);

module.exports = router;