const { Router } = require("express");
const router = Router();
const courseController = require(`${process.env.API}/home/course`);
router.get("/lastCourses", courseController.lastCourses)
module.exports = router;