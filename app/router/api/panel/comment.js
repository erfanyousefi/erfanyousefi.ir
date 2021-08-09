const { Router } = require("express");
const router = Router();
const commentController = require(`${process.env.API}/comment`);

router.get("/all", commentController.comments);
router.get("/:id", commentController.acceptComment);
router.delete("/:id", commentController.deleteComment);
router.get("/ignore/:id", commentController.ignoreComment);


module.exports = router;