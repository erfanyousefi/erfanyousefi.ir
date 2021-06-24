const { Router } = require("express");
const router = Router();
const courseRoutes = require("app/router/api/panel/course")
const categoryRoutes = require("app/router/api/panel/category")
const tagRoutes = require("app/router/api/panel/tag")
router.use("/course", courseRoutes);
router.use("/category", categoryRoutes);
router.use("/tag", tagRoutes);

module.exports = router;