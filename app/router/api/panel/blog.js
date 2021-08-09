const { Router } = require("express")
const router = Router();
const blogValidator = require("app/validator/blog");
const blogController = require(`${process.env.API}/blog`);
const upload = require("app/http/middleware/uploadImage");
router.post("/insert", upload.single("img"), blogValidator.insert(), blogController.insertBlog)
router.get("/all", blogController.blogs)
router.put("/:id", upload.single("img"), blogController.updateBlog);
router.get("/:id", blogController.findBlog);
router.delete("/:id", blogController.removeBlog);
//-------------------------------------------------------
router.post("/chapter/:id", blogValidator.insertChapter(), blogController.insertChapter);
router.get("/chapter/:id", blogController.findChapter);
router.get("/chapters/:id", blogController.chapters);
router.delete("/chapter/:id", blogController.removeChapter);
router.put("/chapter/:id", blogController.updateChapter);
//------------------------------------------------------
router.post("/lesson/:id", upload.single("img"), blogValidator.insertLesson(), blogController.insertLesson);
router.get("/lesson/:id", blogController.findLesson);
router.get("/lessons/:id", blogController.Lessons);
router.put("/lesson/:id", upload.single("img"), blogController.updateLesson);
router.delete("/lesson/:id", blogController.removeLesson);

module.exports = router;