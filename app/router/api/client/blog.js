const { Router } = require("express");
const router = Router();
const blogController = require(`${process.env.API}/home/blog`);
router.get("/lastBlogs", blogController.lastBlogs)
router.get("/blog/:slug", blogController.slugBlog)
router.get("/blogs", blogController.blogs)
router.get("/blog/lesson/:slug", blogController.findLessonWithSlug)
module.exports = router;