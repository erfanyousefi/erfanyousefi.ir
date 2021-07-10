const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/client/course")
const blogRoutes = require("app/router/api/client/blog");
const user = require("app/http/controller/api/home/user");
const commentController = require("app/http/controller/api/home/comment");
const homeController = require("app/http/controller/api/home/home");
const auth = require("app/http/middleware/auth");
router.use(courseRoutes)
router.use(blogRoutes)
router.post("/user", user.findUserWithToken);
router.post("/comment", auth.notLogin, commentController.insert)
router.get("/comments/:id/:flag", commentController.comments)
router.post("/contact-us", homeController.saveContactUs)
module.exports = router;