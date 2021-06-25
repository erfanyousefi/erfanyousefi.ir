const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/client/course")
router.use(courseRoutes)
module.exports = router;