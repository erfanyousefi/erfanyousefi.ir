const { Router } = require("express");
const router = Router();
const commentController = require(`${process.env.API}/comment`);

router.get("/all", commentController.comments);


module.exports = router;