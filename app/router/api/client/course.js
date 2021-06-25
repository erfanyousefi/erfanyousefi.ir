const { Router } = require("express");
const router = Router();
const courseController = require(`${process.env.API}/home/course`);
router.get("/lastCourses", courseController.lastCourses)
router.get("/course/:slug", courseController.slugCourse)
router.get("/courses", courseController.courses)
module.exports = router;