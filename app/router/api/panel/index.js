const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/panel/course")
const categoryRoutes = require("app/router/api/panel/category")
const tagRoutes = require("app/router/api/panel/tag")
const userRoutes = require("app/router/api/panel/user")
const blogRoutes = require("app/router/api/panel/blog")
const commentRoutes = require("app/router/api/panel/comment")
router.use("/course", courseRoutes);
router.use("/category", categoryRoutes);
router.use("/tag", tagRoutes);
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router;