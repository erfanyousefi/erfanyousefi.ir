const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/client/course")
const blogRoutes = require("app/router/api/client/blog");
const user = require("app/http/controller/api/home/user");
router.use(courseRoutes)
router.use(blogRoutes)
router.post("/user", user.findUserWithToken);
module.exports = router;