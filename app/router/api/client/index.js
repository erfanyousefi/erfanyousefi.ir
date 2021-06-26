const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/client/course")
const blogRoutes = require("app/router/api/client/blog")
router.use(courseRoutes)
router.use(blogRoutes)
module.exports = router;